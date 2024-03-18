import * as React from "react"
import MarkDown from "../../markdown/markdown"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentsList from "../../comments/list/comments.list"
import CommentCreate from "../../comments/create/comments.create"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { POSTS_SERVICE, POST_STATES, Post, Tag } from "../../../services/posts/posts.service"
import DateFormatted from "../../date/date.formatted"
import StyledLink from "../../buttons/styled.link"
import { USERS_SERVICE } from "../../../services/users/users.service"

const PostView = (props: { postUuid: string }) => {
  const { t } = useTranslation()
  const [profile] = useProfile()
  const [showCreateCommentForm, setShowCreateCommentForm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [post, setPost] = React.useState({} as Post)
  const [renderedCreateCommentFormIndex, setRenderedCreateCommentFormIndex] = React.useState(-1)
  const [renderedEditCommentFormIndex, setRenderedEditCommentFormIndex] = React.useState(-1)
  const { postUuid } = props

  const handleNewCommentEvent = () => {
    setShowCreateCommentForm(true)
    setRenderedCreateCommentFormIndex(-1)
    setRenderedEditCommentFormIndex(-1)
  }

  const fetchPost = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      let response = await POSTS_SERVICE.get({ postUuid })
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
    fetchPost()
  }, [props.postUuid])

  if (isLoading || !post || Object.keys(post).length === 0) {
    return (
      <div>
        <Overlay />
      </div>
    )
  }

  const { Topic, Text, CreateDate, AuthorName, Tags } = post

  const AddCommentButton = (
    <StyledLink href="#new_comment_form"
      text={t("post.page.btn.new.comment")}
      onClick={handleNewCommentEvent}
      classes="uppercase font-bold text-lg outline-none ease-linear transition-all duration-150"
    />
  )

  return (
    <div>
      <div className="p-3 my-4 border-1 primary-content-block">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-xs"><DateFormatted date={CreateDate} /></div>
            <span className="mx-2">|</span>
            <div className="text-xs">{AuthorName}</div>
          </div>
          <div className="flex items-center text-xs">
            {post && Tags && post.Tags.map(function (tag: Tag, idx) {
              return (
                <StyledLink href={"/posts/" + tag.Id + "/0"} text={tag.Name} key={idx} classes="ml-2" />
              )
            })}
          </div>
        </div>
        <h1 className="font-extrabold leading-tight text-6xl mt-0 mb-2 text-center">{Topic}</h1>
        <MarkDown text={Text} />
      </div>
      {/* TODO: no comments at current verision */}
      {/* <div className="mt-5">
        <div className="flex justify-between items-center">
          <h2 className="font-bold leading-tight text-3xl mt-0 text-center">{t("post.page.comment.header")}</h2>
          {!profile ? "" : AddCommentButton}
        </div>
        {showCreateCommentForm && (
          <CommentCreate id="new_comment_form" postUuid={PostUuid} linkedCommentUuid=""
            onCancel={() => {
              setShowCreateCommentForm(false)
            }} />
        )}

        <div className="primary-content-block2">
          <CommentsList comments={post.Comments} commentsMap={post.CommentsMap}
            onReplyCommentBtnClick={() => {
              setShowCreateCommentForm(false)
            }}
            onEditCommentBtnClick={() => {
              setShowCreateCommentForm(false)
            }}
            renderedCreateCommentFormIndex={renderedCreateCommentFormIndex}
            setRenderedCreateCommentFormIndex={(v: number) => setRenderedCreateCommentFormIndex(v)}
            renderedEditCommentFormIndex={renderedEditCommentFormIndex}
            setRenderedEditCommentFormIndex={(v: number) => setRenderedEditCommentFormIndex(v)}
          />

        </div>
      </div> */}
    </div>
  )
}

export default PostView