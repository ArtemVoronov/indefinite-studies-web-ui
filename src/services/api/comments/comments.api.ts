import { ApiClient } from '../api-client'

export class CommentsApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async get(options: GetCommentOptions): Promise<any> {
    const { postUuid, commentId } = options
    return this.api.apisauce.get(`/api/v1/posts/${postUuid}/comments/${commentId}`)
  }

  async create(options: CreateCommentOptions): Promise<any> {
    return this.api.apisauce.post("/api/v1/posts/comments", options)
  }

  async update(options: UpdateCommentOptions): Promise<any> {
    return this.api.apisauce.put("/api/v1/posts/comments", options)
  }
}

export type GetCommentOptions = { postUuid: string, commentId: number }
export type CreateCommentOptions = { authorUuid: string, postUuid: string, text: string, linkedCommentId?: number }
export type UpdateCommentOptions = { authorUuid: string, postUuid: string, commentId: number, text?: string, state?: string }