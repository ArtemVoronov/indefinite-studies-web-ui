import { ApiClient } from '../api-client'

export class CommentsApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async create(options: CreateCommentOptions): Promise<any> {
    return this.api.apisauce.post("/api/v1/posts/comments", options)
  }

  async update(options: UpdateCommentOptions): Promise<any> {
    return this.api.apisauce.put("/api/v1/posts/comments", options)
  }
}

export type CreateCommentOptions = { authorUuid: string, postUuid: string, text: string, linkedCommentUuid: string }
export type UpdateCommentOptions = { authorUuid: string, postUuid: string, commentId: number, commentUuid: string, text?: string, state?: string }