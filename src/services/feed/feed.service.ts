import { ApiResponse } from "apisauce"
import { ApiClient, API_CLIENT, API_CLIENT_SERVER_SIDE } from "../api/api-client"
import { API_ERROR_HANDLER } from '../api/api-error-handler'
import { GetPostsFeedOptions, GetCommentsFeedOptions } from "../api/feed/feed.api"

// TODO: service should some maningful results instead of response
export class FeedService {
  client: ApiClient
  constructor(client: ApiClient = API_CLIENT) {
    this.client = client
  }

  async getPosts(options: GetPostsFeedOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.getPosts(options),
    })
    return result
  }

  async getComments(options: GetCommentsFeedOptions): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.getComments(options)
    })
    return result
  }

  async startSync(): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.startSync()
    })
    return result
  }

  async stopSync(): Promise<ApiResponse<any>> {
    const result = await API_ERROR_HANDLER.callWithErrorHandling({
      action: () => this.client.feed.stopSync()
    })
    return result
  }

}

export const FEED_SERVICE: FeedService = new FeedService()
export const FEED_SERVICE_SERVER_SIDE: FeedService = new FeedService(API_CLIENT_SERVER_SIDE)

export type FeedComment = {
  Id: number
  CreateDate: number
  State: string
}