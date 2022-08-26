import { ApiClient } from '../api-client'

export class UsersApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async ping(): Promise<any> {
    return this.api.apisauce.get("/api/v1/users/ping")
  }

  async safePing(): Promise<any> {
    return this.api.apisauce.get("/api/v1/users/safe-ping")
  }

}