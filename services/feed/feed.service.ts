import { ApiResponse } from "apisauce"
import { ApiClient, API_CLIENT, API_CLIENT_SERVER_SIDE } from "../api/api-client"
import { API_ERROR_HANDLER } from '../api/api-error-handler'
import { GetFeedPostOptions, } from "../api/feed/feed.api"
import { GetAllOptions } from "../../utils/utils"

// TODO: service should some maningful results instead of response
export class FeedService {
    client: ApiClient
    constructor(client: ApiClient = API_CLIENT) {
        this.client = client
    }

    // TODO: returns []FeedBlock
    async getAll(options: GetAllOptions): Promise<ApiResponse<any>> {
        const { offset, limit } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => this.client.feed.getAll({ offset, limit }),
        })
        return result
    }

    // TODO: returns FullPostInfo
    async get(options: GetFeedPostOptions): Promise<ApiResponse<any>> {
        const { postId } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => this.client.feed.get({ postId })
        })
        return result
    }
}


export const FEED_SERVICE: FeedService = new FeedService()
export const FEED_SERVICE_SERVER_SIDE: FeedService = new FeedService(API_CLIENT_SERVER_SIDE)

export type FeedBlock = {
    PostId: number
    PostPreviewText: string
    PostTopic: string
    AuthorId: number
    AuthorName: string
    CreateDate: number
    CommentsCount: number
}
export type FeedPost = {
    PostId: number
    PostText: string
    PostPreviewText: string
    PostTopic: string
    PostState: string
    AuthorId: number
    AuthorName: string
    CreateDate: number
    LastUpdateDate: number
}

export type FeedComment = {
    CommentId: number
    CommentText: string
    CommentState: string
    AuthorId: number
    AuthorName: string
    PostId: number
    LinkedCommentId: number | null
    CreateDate: number
    LastUpdateDate: number
}

export type FeedCommentWithIndex = {
    Index: number
    CommentId: number
    CommentText: string
    CommentState: string
    AuthorId: number
    AuthorName: string
    PostId: number
    LinkedCommentId: number | null
    CreateDate: number
    LastUpdateDate: number
}

export type FeedCommentsMap = {
    [key: number]: FeedCommentWithIndex
}

export type FullPostInfo = {
    Post: FeedPost,
    Comments: Array<FeedComment>,
    CommentsMap: FeedCommentsMap,
}