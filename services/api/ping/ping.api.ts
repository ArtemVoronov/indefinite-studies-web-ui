import { ApiClient } from "../api-client"

export class PingApi {
	api: ApiClient

	constructor(api: ApiClient) {
		this.api = api
	}

	async ping(): Promise<any> {
		return this.api.apisauce.get("/api/v1/ping")
	}

	async safePing(): Promise<any> {
		return this.api.apisauce.get("/api/v1/safe-ping")
	}

}
