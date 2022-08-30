import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../../services/api/api-client"
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import { GetPostOptions, CreatePostOptions, UpdatePostOptions } from "../../services/api/posts/posts.api"
import { GetAllOptions } from "../../utils/utils"

export class PostsService {

    async getAll(options: GetAllOptions): Promise<ApiResponse<any>> {
        const { offset, limit } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.getAll({ offset, limit }),
        })
        return result
    }

    async get(options: GetPostOptions): Promise<ApiResponse<any>> {
        const { postId } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.get({ postId })
        })
        return result
    }

    async create(options: CreatePostOptions): Promise<ApiResponse<any>> {
        const { authorId, text, topic } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.create({ authorId, text, topic })
        })
        return result
    }

    async update(options: UpdatePostOptions): Promise<ApiResponse<any>> {
        const { postId, authorId, text, topic } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.update({ postId, authorId, text, topic })
        })
        return result
    }
}


export const POSTS_SERVICE: PostsService = new PostsService()

export type Post = {
    Id: number,
    AuthorId: number,
    Text: string,
    Topic: string,
    State: string
}