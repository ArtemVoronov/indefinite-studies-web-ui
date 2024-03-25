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

  async getPosts(options: GetPostsFeedOptions): Promise<any> {
    const { offset, limit, tagId, state, userUuid } = options
    const url = "/api/v1/feed/posts"
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
    if (!isNil(state)) {
      params.push(new QueryParameter("state", state))
    }
    if (!isNil(userUuid)) {
      params.push(new QueryParameter("userUuid", userUuid))
    }
    const builder = new UrlBuilder(url, params)
    return this.api.apisauce.get(builder.build())
  }


  async getComments(options: GetCommentsFeedOptions): Promise<any> {
    const { offset, limit, postUuid } = options
    const url = `/api/v1/feed/posts/${postUuid}/comments`
    const params = []
    if (!isNil(offset)) {
      params.push(new QueryParameter("offset", offset))
    }
    if (!isNil(limit)) {
      params.push(new QueryParameter("limit", limit))
    }
    const builder = new UrlBuilder(url, params)
    return this.api.apisauce.get(builder.build())
  }

  async startSync(): Promise<any> {
    return this.api.apisauce.post(`/api/v1/feed/sync/start`)
  }

  async stopSync(): Promise<any> {
    return this.api.apisauce.post(`/api/v1/feed/sync/stop`)
  }
}

export type GetPostsFeedOptions = { offset?: number, limit?: number, tagId?: string, state?: string, userUuid?: string }
export type GetCommentsFeedOptions = { offset?: number, limit?: number, postUuid: string }