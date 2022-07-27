import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import { ApiResponse, ApisauceInstance, create, Monitor } from "apisauce"
import { UsersApi } from "../api/users/users.api"
import { NotesApi } from "../api/notes/notes.api"

export class ApiClient {
  apisauce: ApisauceInstance
  config: ApiConfig
  users: UsersApi
  notes: NotesApi

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config

    this.apisauce = create({
      baseURL: config.url,
      timeout: config.timeoutInMillis,
      headers: {
        Accept: "application/json",
      },
    })

    // TODO: make sending monitoring statistics to kafka
    // const loggingMonitor = (response: ApiResponse<any>) => {
    // }
    // this.apisauce.addMonitor(loggingMonitor)

    this.users = new UsersApi(this)
    this.notes = new NotesApi(this)
  }

  setJWTAuthrozationHeader(token: string) {
    this.apisauce.setHeaders({
      Authorization: `Bearer ${token}`,
    })
  }

  setBasicAuthrozationHeader(encodedCredentials: string) {
    console.log("---------------------------setBasicAuthrozationHeader--------------------------") // TODO: clean
    this.apisauce.setHeaders({
      Authorization: `Basic ${encodedCredentials}`,
    })
  }

  deleteAuthrozationHeader() {
    this.apisauce.deleteHeader("Authorization")
  }
}

export const API_CLIENT: ApiClient = new ApiClient()
