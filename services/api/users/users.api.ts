import { ApiClient } from '../api-client'

export class UsersApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async getMe(): Promise<any> {
    return this.api.apisauce.get("/api/v1/users/me")
  }

  async update(options: UpdateUserOptions): Promise<any> {
    const { id, login, email, password } = options
    return this.api.apisauce.put("/api/v1/users", {
      id,
      login,
      email,
      password
    })
  }
}

export type UpdateUserOptions = { id: number, login: string, email: string, password: string }