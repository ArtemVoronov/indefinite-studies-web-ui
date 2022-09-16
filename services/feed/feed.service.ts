import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../api/api-client"
import { API_ERROR_HANDLER } from '../api/api-error-handler'
import { GetFeedPostOptions, } from "../api/feed/feed.api"
import { GetAllOptions } from "../../utils/utils"

// TODO: service should some maningful results instead of response
export class FeedService {

    // TODO: returns []FeedBlock
    async getAll(options: GetAllOptions): Promise<ApiResponse<any>> {
        const { offset, limit } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.feed.getAll({ offset, limit }),
        })
        return result
    }

    // TODO: returns FullPostInfo
    async get(options: GetFeedPostOptions): Promise<ApiResponse<any>> {
        const { postId } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.feed.get({ postId })
        })
        return result
    }
}


export const FEED_SERVICE: FeedService = new FeedService()

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

export type FullPostInfo = {
    Post: FeedPost,
    Comments: Array<FeedComment>,
}