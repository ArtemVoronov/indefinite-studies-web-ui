import { ApiConfig, DEFAULT_API_CONFIG, DEFAULT_SERVER_SIDE_API_CONFIG } from "./api-config"
import { ApisauceInstance, create } from "apisauce"
import { AuthApi } from "./auth/auth.api"
import { PostsApi } from "./posts/posts.api"
import { UsersApi } from "./users/users.api"
import { FeedApi } from "./feed/feed.api"
import { CommentsApi } from "./comments/comments.api"
import * as uuid from "uuid";

export class ApiClient {
    apisauce: ApisauceInstance
    config: ApiConfig
    auth: AuthApi
    posts: PostsApi
    comments: CommentsApi
    users: UsersApi
    feed: FeedApi

    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config

        this.apisauce = create({
            baseURL: config.url,
            timeout: config.timeoutInMillis,
            headers: {
                Accept: "application/json",
            },
        })

        // TODO: make sending monitoring statistics to kafka
        // const loggingMonitor = (response: ApiResponse<any>) => {
        // }
        // this.apisauce.addMonitor(loggingMonitor)

        this.apisauce.addRequestTransform(request => {
            request.headers['Request-Id'] = uuid.v4();
        })

        this.auth = new AuthApi(this)
        this.posts = new PostsApi(this)
        this.users = new UsersApi(this)
        this.feed = new FeedApi(this)
        this.comments = new CommentsApi(this)
    }

    setJWTAuthrozationHeader(token: string) {
        this.apisauce.setHeaders({
            Authorization: `Bearer ${token}`,
        })
    }

    setBasicAuthrozationHeader(encodedCredentials: string) {
        this.apisauce.setHeaders({
            Authorization: `Basic ${encodedCredentials}`,
        })
    }

    deleteAuthrozationHeader() {
        this.apisauce.deleteHeader("Authorization")
    }
}

export const API_CLIENT: ApiClient = new ApiClient()
export const API_CLIENT_SERVER_SIDE: ApiClient = new ApiClient(DEFAULT_SERVER_SIDE_API_CONFIG)
