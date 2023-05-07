import * as React from "react"
import MarkDown from "../../markdown/markdown"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentsList from "../../comments/list/comments.list"
import CommentCreate from "../../comments/create/comments.create"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"
import { useTranslation } from "next-i18next"
import { POST_STATES, Tag } from "../../../services/posts/posts.service"
import DateFormatted from "../../date/date.formatted"
import StyledLink from "../../buttons/styled.link"

const PostView = (props: { postUuid: string }) => {
  const { t } = useTranslation()
  const [profile] = useProfile()
  const [showCreateCommentForm, setShowCreateCommentForm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [post, setPost] = React.useState({} as FullPostInfo)
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
      const response = await FEED_SERVICE.get({ postUuid })
      clearTimeout(timer)
      if (response.status === 200) {
        const content = response.data as FullPostInfo
        if (content.Post.PostState === POST_STATES.PUBLISHED) {
          setPost(response.data)
        }
      }
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPost()
  }, [])

  if (isLoading) return (
    <div>
      <Overlay />
    </div>
  )

  if (!post || Object.keys(post).length === 0) return (
    <div>
      {t("no.data")}
    </div>
  )

  const { PostUuid, PostTopic, PostText, CreateDate, AuthorName, Tags } = post.Post

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
            {Tags.map(function (tag: Tag, idx) {
              return (
                <StyledLink href={"/posts/" + tag.Id + "/0"} text={tag.Name} key={idx} classes="ml-2" />
              )
            })}
          </div>
        </div>
        <h1 className="font-extrabold leading-tight text-6xl mt-0 mb-2 text-center">{PostTopic}</h1>
        <MarkDown text={PostText} />
      </div>
      <div className="mt-5">
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
      </div>
    </div>
  )
}

export default PostView