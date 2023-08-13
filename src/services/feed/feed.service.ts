import { ApiResponse } from "apisauce"
import { ApiClient, API_CLIENT, API_CLIENT_SERVER_SIDE } from "../api/api-client"
import { API_ERROR_HANDLER } from '../api/api-error-handler'
import { GetFeedAllOptions, GetFeedCommentsOptions, GetFeedPostOptions, GetFeedUsersOptions, } from "../api/feed/feed.api"

// TODO: service should some maningful results instead of response
export class FeedService {
  client: ApiClient
  constructor(client: ApiClient = API_CLIENT) {
    this.client = client
  }

  async getAll(options: GetFeedAllOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.getAll(options),
    })
    return result
  }

  async get(options: GetFeedPostOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.get(options)
    })
    return result
  }

  async sync(): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.sync()
    })
    return result
  }

  async clear(): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.clear()
    })
    return result
  }

  async getUsers(options: GetFeedUsersOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.getUsers(options),
    })
    return result
  }

  async getComments(options: GetFeedCommentsOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.getComments(options),
    })
    return result
  }

}


export const FEED_SERVICE: FeedService = new FeedService()
export const FEED_SERVICE_SERVER_SIDE: FeedService = new FeedService(API_CLIENT_SERVER_SIDE)

export type FeedBlock = {
  PostUuid: string
  PostPreviewText: string
  PostTopic: string
  AuthorUuid: string
  AuthorName: string
  CreateDate: number
  CommentsCount: number
  Tags: Array<FeedTag>
}
export type FeedPost = {
  PostUuid: string
  PostText: string
  PostPreviewText: string
  PostTopic: string
  PostState: string
  AuthorUuid: string
  AuthorName: string
  CreateDate: number
  LastUpdateDate: number
  Tags: Array<FeedTag>
}

export type FeedComment = {
  CommentId: number
  CommentUuid: string
  CommentText: string
  CommentState: string
  AuthorUuid: string
  AuthorName: string
  PostUuid: string
  LinkedCommentUuid: string
  CreateDate: number
  LastUpdateDate: number
}


export type FeedTag = {
  Id: number
  Name: string
}

export type FeedCommentWithIndex = {
  Index: number
  CommentId: number
  CommentUuid: string
  CommentText: string
  CommentState: string
  AuthorUuid: string
  AuthorName: string
  PostUuid: string
  LinkedCommentUuid: string
  CreateDate: number
  LastUpdateDate: number
}

export type FeedCommentsMap = {
  [key: string]: FeedCommentWithIndex
}

export type FullPostInfo = {
  Post: FeedPost,
  Comments: Array<FeedComment>,
  CommentsMap: FeedCommentsMap,
}