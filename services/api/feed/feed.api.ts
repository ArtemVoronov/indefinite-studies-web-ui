import { ApiClient } from '../api-client'
import { UrlBuilder, QueryParameter, isNil } from '../../../utils/utils'

export class FeedApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async ping(): Promise<any> {
    return this.api.apisauce.get("/api/v1/feed/ping")
  }

  async safePing(): Promise<any> {
    return this.api.apisauce.get("/api/v1/feed/safe-ping")
  }

  async getAll(options: GetFeedAllOptions): Promise<any> {
    const { offset, limit, tagId } = options
    const url = "/api/v1/feed"
    const params = []
    if (!isNil(offset)) {
      params.push(new QueryParameter("offset", offset))
    }
    if (!isNil(limit)) {
      params.push(new QueryParameter("limit", limit))
    }
    if (!isNil(tagId)) {
      params.push(new QueryParameter("tagId", tagId))
    }
    const builder = new UrlBuilder(url, params)
    return this.api.apisauce.get(builder.build())
  }

  async get(options: GetFeedPostOptions): Promise<any> {
    const { postUuid } = options
    return this.api.apisauce.get(`/api/v1/feed/${postUuid}`)
  }

  async sync(): Promise<any> {
    return this.api.apisauce.post(`/api/v1/feed/sync`)
  }

  async clear(): Promise<any> {
    return this.api.apisauce.post(`/api/v1/feed/clear`)
  }
}

export type GetFeedPostOptions = { postUuid: string }
export type GetFeedAllOptions = { offset?: number, limit?: number, tagId?: string }