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
    const { offset, limit, tag } = options
    const url = "/api/v1/feed"
    const params = []
    if (!isNil(offset)) {
      params.push(new QueryParameter("offset", offset))
    }
    if (!isNil(limit)) {
      params.push(new QueryParameter("limit", limit))
    }
    if (!isNil(tag)) {
      params.push(new QueryParameter("tag", limit))
    }
    const builder = new UrlBuilder(url, params)
    return this.api.apisauce.get(builder.build())
  }

  async get(options: GetFeedPostOptions): Promise<any> {
    const { postUuid } = options
    return this.api.apisauce.get(`/api/v1/feed/${postUuid}`)
  }
}

export type GetFeedPostOptions = { postUuid: string }
export type GetFeedAllOptions = { offset?: number, limit?: number, tag?: string }