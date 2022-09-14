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
    const { offset, limit } = options
    const url = "/api/v1/posts"
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

  async get(options: GetPostOptions): Promise<any> {
    const { postId } = options
    return this.api.apisauce.get(`/api/v1/posts/${postId}`)
  }

  async create(options: CreatePostOptions): Promise<any> {
    const { authorId, text, topic, previewText } = options
    return this.api.apisauce.post("/api/v1/posts", {
      authorId,
      text,
      topic,
      previewText
    })
  }

  async update(options: UpdatePostOptions): Promise<any> {
    const { postId, authorId, text, topic, previewText } = options
    return this.api.apisauce.put("/api/v1/posts/", {
      id: postId,
      authorId,
      text,
      topic,
      previewText
    })
  }
}

export type GetPostOptions = { postId: number | string }
export type CreatePostOptions = { authorId: number, text: string, topic: string, previewText: string }
export type UpdatePostOptions = { postId: number, authorId: number, text: string, topic: string, previewText: string }