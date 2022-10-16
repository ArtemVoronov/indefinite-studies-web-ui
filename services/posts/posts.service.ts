import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../../services/api/api-client"
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import { GetPostOptions, CreatePostOptions, UpdatePostOptions, CreateTagOptions, UpdateTagOptions, AssignTagOptions, RemoveTagOptions } from "../../services/api/posts/posts.api"
import { GetAllOptions } from "../../utils/utils"

// TODO: service should some maningful results instead of response
export class PostsService {

    async getAll(options: GetAllOptions): Promise<ApiResponse<any>> {
        const { offset, limit } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.getAll({ offset, limit }),
        })
        return result
    }

    async get(options: GetPostOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.get(options)
        })
        return result
    }

    async create(options: CreatePostOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.create(options)
        })
        return result
    }

    async update(options: UpdatePostOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.update(options)
        })
        return result
    }

    async getTags(options: GetAllOptions): Promise<ApiResponse<any>> {
        const { offset, limit } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.getTags({ offset, limit }),
        })
        return result
    }

    async createTag(options: CreateTagOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.createTag(options),
        })
        return result
    }

    async updateTag(options: UpdateTagOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.updateTag(options),
        })
        return result
    }

    async assignTag(options: AssignTagOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.assignTag(options),
        })
        return result
    }

    async removeTag(options: RemoveTagOptions): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.removeTag(options),
        })
        return result
    }
}

export const POSTS_SERVICE: PostsService = new PostsService()

export type Tag = {
    Id: number
    Name: string
}