import { ApiClient } from '../api-client'
import { GetAllOptions, UrlBuilder, QueryParameter, isNil } from '../../../utils/utils'

export class PostsApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async ping(): Promise<any> {
    return this.api.apisauce.get("/api/v1/posts/ping")
  }

  async safePing(): Promise<any> {
    return this.api.apisauce.get("/api/v1/posts/safe-ping")
  }

  async getAll(options: GetAllOptions): Promise<any> {
    const { offset, limit, shard } = options
    const url = "/api/v1/posts"
    const params = []
    if (!isNil(offset)) {
      params.push(new QueryParameter("offset", offset))
    }
    if (!isNil(limit)) {
      params.push(new QueryParameter("limit", limit))
    }
    if (!isNil(shard)) {
      params.push(new QueryParameter("shard", shard))
    }
    const builder = new UrlBuilder(url, params)
    return this.api.apisauce.get(builder.build())
  }

  async get(options: GetPostOptions): Promise<any> {
    const { postUuid } = options
    return this.api.apisauce.get(`/api/v1/posts/${postUuid}`)
  }

  async create(options: CreatePostOptions): Promise<any> {
    const { authorUuid, text, topic, previewText, tagId } = options
    return this.api.apisauce.post("/api/v1/posts", {
      authorUuid,
      text,
      topic,
      previewText,
      tagId
    })
  }

  async update(options: UpdatePostOptions): Promise<any> {
    const { postUuid, authorUuid, text, topic, previewText } = options
    return this.api.apisauce.put("/api/v1/posts/", {
      Uuid: postUuid,
      authorUuid,
      text,
      topic,
      previewText
    })
  }
}

export type GetPostOptions = { postUuid: string }
export type CreatePostOptions = { authorUuid: string, text: string, topic: string, previewText: string, tagId: number }
export type UpdatePostOptions = { postUuid: string, authorUuid: string, text: string, topic: string, previewText: string }