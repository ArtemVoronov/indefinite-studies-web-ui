import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../../services/api/api-client"
import { AuthTokens } from "../../services/api/auth/auth.api"

export const ACCESS_TOKEN_KEY = "accessToken"
export const REFRESH_TOKEN_KEY = "refreshToken"

export interface CallWithErrorHandlingParams {
    action: () => Promise<ApiResponse<any>>,
}

export class AuthService {

    login(email: string, password: string) {
        API_CLIENT.auth.login(email, password)
            .then((response) => {
                if (!response.ok) {
                    // TODO: show error
                    return
                }

                const result: AuthTokens = response.data
                API_CLIENT.setJWTAuthrozationHeader(result.accessToken)
                window.localStorage[ACCESS_TOKEN_KEY] = result.accessToken
                window.localStorage[REFRESH_TOKEN_KEY] = result.refreshToken
            })
    }

    refreshToken() {
        const refreshToken = window.localStorage[REFRESH_TOKEN_KEY]
        API_CLIENT.auth.refreshToken(refreshToken)
            .then((response) => {
                if (!response.ok) {
                    console.error("Unable to refresh token")
                    // TODO: show error
                    return
                }

                const result: AuthTokens = response.data
                API_CLIENT.setJWTAuthrozationHeader(result.accessToken)
                window.localStorage[ACCESS_TOKEN_KEY] = result.accessToken
                window.localStorage[REFRESH_TOKEN_KEY] = result.refreshToken
            })
    }

    logout() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        API_CLIENT.deleteAuthrozationHeader()
    }
}


export const AUTH_SERVICE: AuthService = new AuthService()
