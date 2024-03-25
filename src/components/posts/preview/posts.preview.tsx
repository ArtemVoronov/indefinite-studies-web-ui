import * as React from "react"
import MarkDown from "../../markdown/markdown"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { POSTS_SERVICE, Post, Tag } from "../../../services/posts/posts.service"
import DateFormatted from "../../date/date.formatted"
import StyledLink from "../../buttons/styled.link"
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { USERS_SERVICE } from "../../../services/users/users.service"
import { FEED_SERVICE, FeedComment } from "../../../services/feed/feed.service"
import { COMMENT_STATES } from "../../../services/comments/comments.service"

// TODO: add tag i18n
const PostPreview = (props: { postUuid: string }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = React.useState(false)
  const [post, setPost] = React.useState({} as Post)

  const getCommentsCountText = (commentsCount: number): string => {
    let commentsWord = ""
    if (commentsCount == 1) {
      commentsWord = t("posts.page.comment.count.1")
    } else if (commentsCount == 2 || commentsCount == 3 || commentsCount == 4) {
      commentsWord = t("posts.page.comment.count.2.3.4")
    } else {
      commentsWord = t("posts.page.comment.count")
    }
    return commentsCount + " " + commentsWord
  }

  const fetchPostPreview = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      let response = await POSTS_SERVICE.getPreview({ postUuid: props.postUuid })
      clearTimeout(timer)
      if (response.status !== 200) {
        return
      }
      let loadedPost = response.data as Post

      response = await USERS_SERVICE.getUserName({ Uuid: loadedPost.AuthorUuid })
      if (response.status !== 200) {
        return
      }

      loadedPost.AuthorName = response.data

      // TODO: fetch all with pagination, for now it's used temporary solution:
      // TODO: use some cache counter
      const OFFSET = 0
      const LIMIT = 10000
      response = await FEED_SERVICE.getComments({ offset: OFFSET, limit: LIMIT, postUuid: props.postUuid })
      if (response.status !== 200) {
        return
      }

      const loadedCommentsFeed = response.data.Data as FeedComment[]
      loadedPost.CommentsCount = loadedCommentsFeed.filter((c) => c.State == COMMENT_STATES.PUBLISHED).length

      setPost(loadedPost)
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPostPreview()
  }, [props.postUuid])

  if (isLoading || !post || Object.keys(post).length === 0) {
    return (
      <div>
        <Overlay />
      </div>
    )
  }

  return (
    <div className="flex flex-col p-3 my-4 border-1 primary-content-block">
      <div className="mb-3 text-center text-2xl">
        <StyledLink href={"/post/" + post.Uuid} text={post.Topic} classes="font-extrabold leading-tight text-4xl mt-0 mb-2 text-center" />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-xs"><DateFormatted date={post.CreateDate} /></div>
          <span className="mx-2">|</span>
          <div className="text-xs">{post.AuthorName}</div>
          <span className="mx-2">|</span>
          <div className="text-xs">
            {/* TODO: fix text for 0, 1, 2, multiple comments cases in different locales */}
            <StyledLink href={"/post/" + post.Uuid} text={getCommentsCountText(post.CommentsCount)} />
          </div>
        </div>
        <div className="flex items-center text-xs">
          {post.Tags && post.Tags.map(function (tag: Tag, idx) {
            return (
              <StyledLink href={"/posts/" + tag.Id + "/0"} text={tag.Name} key={idx} classes="ml-2" />
            )
          })}
        </div>
      </div>
      <div>
        <MarkDown text={post.PreviewText} />
      </div>
    </div >
  )
}

export default PostPreview