import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../../services/api/api-client"
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'

export class PostsService {
    async getMe(): Promise<ApiResponse<any>> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.getMe()
        })
        return result
    }
}

export const USERS_SERVICE: PostsService = new PostsService()

export type User = {
    Id: number,
    Login: string,
    Email: string,
    Role: string,
    State: string
}