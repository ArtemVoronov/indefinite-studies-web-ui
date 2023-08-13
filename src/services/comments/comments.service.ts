import { ApiResponse } from "apisauce"
import { API_CLIENT } from "../../services/api/api-client"
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import { CreateCommentOptions, UpdateCommentOptions } from "../../services/api/comments/comments.api"

// TODO: service should some maningful results instead of response
export class CommentsService {
  async create(options: CreateCommentOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => API_CLIENT.comments.create(options)
    })
    return result
  }

  async update(options: UpdateCommentOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => API_CLIENT.comments.update(options)
    })
    return result
  }
}

export const COMMENTS_SERVICE: CommentsService = new CommentsService()

export const COMMENT_STATES = {
  "NEW": "NEW",
  "ON_MODERATION": "ON_MODERATION",
  "PUBLISHED": "PUBLISHED",
  "BLOCKED": "BLOCKED",
}