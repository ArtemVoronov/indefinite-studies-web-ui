import * as React from "react"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { POSTS_SERVICE, Post, Tag } from "../../../services/posts/posts.service"
import DateFormatted from "../../date/date.formatted"
import StyledLink from "../../buttons/styled.link"
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { USERS_SERVICE } from "../../../services/users/users.service"

// TODO: add tag i18n
const PostPreview = (props: { postUuid: string }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = React.useState(false)
  const [post, setPost] = React.useState({} as Post)

  // TODO: add comments later
  // const getCommentsCountText = (): string => {
  //   let commentsWord = ""
  //   if (CommentsCount == 1) {
  //     commentsWord = t("posts.page.comment.count.1")
  //   } else if (CommentsCount == 2 || CommentsCount == 3 || CommentsCount == 4) {
  //     commentsWord = t("posts.page.comment.count.2.3.4")
  //   } else {
  //     commentsWord = t("posts.page.comment.count")
  //   }
  //   return CommentsCount + " " + commentsWord
  // }

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

      setPost(loadedPost)
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }


  React.useEffect(() => {
    fetchPostPreview()
  }, [])

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
          {/* <span className="mx-2">|</span> */}
          {/* <div className="text-xs"> */}
          {/* TODO: fix text for 0, 1, 2, multiple comments cases in different locales */}
          {/* <StyledLink href={"/post/" + Uuid} text={getCommentsCountText()} /> */}
          {/* </div> */}
        </div>
        <div className="flex items-center text-xs">
          {post.Tags && post.Tags.map(function (tag: Tag, idx) {
            if (!tag) {
              return <div />
            }
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