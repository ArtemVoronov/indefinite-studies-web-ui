import { ApiResponse, UNKNOWN_ERROR } from "apisauce"
import { AUTH_SERVICE } from "../../services/auth/auth-service"

export const REFRESH_TOKEN_KEY = "refreshToken"

export interface CallWithErrorHandlingParams {
	action: () => Promise<ApiResponse<any>>,
}

export class ApiErrorHandler {

	async callWithErrorHandling(params: CallWithErrorHandlingParams): Promise<any> {
		try {
			const response: ApiResponse<any> = await params.action()
			const finalResponse = await this.handleUnauthorizeResponse(response, params.action)
			// TODO: handle other error cases
			return finalResponse
		} catch (error) {
			console.error("Unable to make a call to API: ", error)
			return { ok: false, problem: UNKNOWN_ERROR }
		}
	}

	async handleUnauthorizeResponse(response: ApiResponse<any>, action: () => Promise<ApiResponse<any>>) {
		if (response.status !== 401) {
			return response
		}
		try {
			AUTH_SERVICE.refreshToken()
			return action()
		} catch (error) {
			console.error("Unexpected error during handling of unauthorized request: ", error)
			return response // continue with 401 (unauthorize)
		}
	}
}

export const API_ERROR_HANDLER: ApiErrorHandler = new ApiErrorHandler()
