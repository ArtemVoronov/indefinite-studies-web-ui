import { ApiClient } from '../api-client'

export class NotesApi {
    api: ApiClient

    constructor(api: ApiClient) {
      this.api = api
    }


    async getAll(options: GetAllNotesOptions): Promise<any> {
      return this.api.apisauce.get(`/api/v1/notes?offset`)
    }
}


// TODO unifu
export type GetAllNotesOptions = { offset?: number, limit?: number}