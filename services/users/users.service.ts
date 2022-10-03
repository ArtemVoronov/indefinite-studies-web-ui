import { API_CLIENT } from "../../services/api/api-client"
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import { ApiResponse } from "apisauce"
import { UpdateUserOptions, SignUpOptions, SignUpConfirmationOptions, SignResendConfirmationOptions, RestorePasswordOptions, RestorePasswordConfirmationOptions } from "../api/users/users.api"

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

    async update(options: UpdateUserOptions): Promise<ApiResponse<any>> {
        const { id, login, password } = options
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.update({ id, login, password })
        })
        return result
    }

    async register(options: SignUpOptions): Promise<any> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.register(options)
        })
        return result
    }

    async confirmRegistration(options: SignUpConfirmationOptions): Promise<any> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.confirmRegistration(options)
        })
        return result
    }

    async resendRegistration(options: SignResendConfirmationOptions): Promise<any> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.resendRegistration(options)
        })
        return result
    }

    async restorePassword(options: RestorePasswordOptions): Promise<any> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.restorePassword(options)
        })
        return result
    }

    async confirmPassword(options: RestorePasswordConfirmationOptions): Promise<any> {
        const result = await API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.users.confirmPassword(options)
        })
        return result
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