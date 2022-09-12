import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import { ApisauceInstance, create } from "apisauce"
import { AuthApi } from "../api/auth/auth.api"
import { PostsApi } from "../api/posts/posts.api"
import { UsersApi } from "../api/users/users.api"
import { FeedApi } from "../api/feed/feed.api"

export class ApiClient {
	apisauce: ApisauceInstance
	config: ApiConfig
	auth: AuthApi
	posts: PostsApi
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

		this.auth = new AuthApi(this)
		this.posts = new PostsApi(this)
		this.users = new UsersApi(this)
		this.feed = new FeedApi(this)
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
