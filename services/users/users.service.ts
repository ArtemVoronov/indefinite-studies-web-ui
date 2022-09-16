import { API_CLIENT } from "../../services/api/api-client"
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'

export class UsersService {
    async getMe(): Promise<User | undefined> {
        const response = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.getMe()
        })

        if (response.status != 200) {
            // TODO: show error
            // TODO: add modal error component or notify error component
            console.log("unable to get profile")
            return undefined
        }

        return response.data
    }
}

export const USERS_SERVICE: UsersService = new UsersService()

export type User = {
    Id: number,
    Login: string,
    Email: string,
    Role: string,
    State: string
}

export const ROLES = {
    "OWNER": "OWNER"
}