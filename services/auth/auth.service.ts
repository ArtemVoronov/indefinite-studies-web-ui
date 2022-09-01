import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../../services/api/api-client"
import { AuthTokens } from "../../services/api/auth/auth.api"

export const ACCESS_TOKEN_KEY = "accessToken"
export const REFRESH_TOKEN_KEY = "refreshToken"

// TODO: service should some maningful results instead of response
export class AuthService {

    async login(email: string, password: string): Promise<ApiResponse<any>> {
        const result = API_CLIENT.auth.login(email, password)
        result.then((response) => {
            if (!response.ok) {
                console.error("Unable to login")
                // TODO: show error
                return
            }

            const result: AuthTokens = response.data
            API_CLIENT.setJWTAuthrozationHeader(result.accessToken)
            window.localStorage[ACCESS_TOKEN_KEY] = result.accessToken
            window.localStorage[REFRESH_TOKEN_KEY] = result.refreshToken
        })
        return result
    }

    async refreshToken(): Promise<ApiResponse<any>> {
        const refreshToken = window.localStorage[REFRESH_TOKEN_KEY]
        const result = API_CLIENT.auth.refreshToken(refreshToken)
        result.then((response) => {
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
        return result
    }

    logout() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        API_CLIENT.deleteAuthrozationHeader()
    }
}


export const AUTH_SERVICE: AuthService = new AuthService()