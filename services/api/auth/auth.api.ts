import { ApiClient } from "../api-client"
import { ApiResponse } from "apisauce"

export type AuthTokens = { accessToken: string, refreshToken: string, accessTokenExpiredAt: number, refreshTokenExpiredAt: number }
export type LoginResult = { kind: "ok"; data: AuthTokens }

export class AuthApi {
	api: ApiClient

	constructor(api: ApiClient) {
		this.api = api
	}

	async login(email: string, password: string): Promise<ApiResponse<any>> {
		return this.api.apisauce.post("/api/v1/auth/login", {
			email,
			password
		})
	}

	async refreshToken(refreshToken: string): Promise<ApiResponse<any>> {
		return this.api.apisauce.post("/api/v1/auth/refresh-token", {
			refreshToken
		})
	}

	async ping(): Promise<any> {
		return this.api.apisauce.get("/api/v1/auth/ping")
	}

	async safePing(): Promise<any> {
		return this.api.apisauce.get("/api/v1/auth/safe-ping")
	}

}
