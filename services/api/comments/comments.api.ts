import { ApiClient } from '../api-client'

export class CommentsApi {
  api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  async create(options: CreateCommentOptions): Promise<any> {
    const { authorId, text, postId, linkedCommentId } = options
    return this.api.apisauce.post("/api/v1/posts/comments", {
      authorId,
      postId,
      text,
      linkedCommentId
    })
  }

  async update(options: UpdateCommentOptions): Promise<any> {
    const { authorId, commentId, text } = options
    return this.api.apisauce.put("/api/v1/posts/comments", {
      authorId,
      id: commentId,
      text,
    })
  }
}

export type CreateCommentOptions = { authorId: number, postId: number, text: string, linkedCommentId?: number }
export type UpdateCommentOptions = { authorId: number, commentId: number, text: string }