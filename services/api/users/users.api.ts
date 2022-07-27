import { ApiClient } from '../api-client'

export class UsersApi {
    api: ApiClient

    constructor(api: ApiClient) {
      this.api = api
    }

    async ping(): Promise<any> {
      return this.api.apisauce.get(`/api/v1/ping`)
    }


  // TODO: unify and export
  private addQueryParams(url: string, options: GetAllUsersOptions) {
    const { offset, limit } = options
    let builder = url + '?'
    builder += offset ? `offset=${offset}` : ''
    builder += limit ? `&limit=${limit}` : ''
    return builder
  }
}

// TODO clean
export type GetAllUsersOptions = { offset?: number, limit?: number}
export type GetAllOptions = {  [key: string|number]: string|number}