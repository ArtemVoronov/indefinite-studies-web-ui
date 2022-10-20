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
    return this.api.apisauce.put("/api/v1/users", options)
  }

  async register(options: SignUpOptions): Promise<any> {
    return this.api.apisauce.post("/api/v1/users/signup", options)
  }

  async confirmRegistration(options: SignUpConfirmationOptions): Promise<any> {
    return this.api.apisauce.put("/api/v1/users/signup", options)
  }

  async resendRegistration(options: SignResendConfirmationOptions): Promise<any> {
    return this.api.apisauce.post("/api/v1/users/signup/resend", options)
  }

  async restorePassword(options: RestorePasswordOptions): Promise<any> {
    return this.api.apisauce.post("/api/v1/users/password/restore", options)
  }

  async confirmPassword(options: RestorePasswordConfirmationOptions): Promise<any> {
    return this.api.apisauce.put("/api/v1/users/password/restore", options)
  }
}

export type UpdateUserOptions = { Uuid: string, login?: string, password?: string, state?: string }
export type SignUpOptions = { login: string, email: string, password: string }
export type SignUpConfirmationOptions = { token: string }
export type SignResendConfirmationOptions = { email: string }
export type RestorePasswordOptions = { email: string }
export type RestorePasswordConfirmationOptions = { token: string, password: string }
