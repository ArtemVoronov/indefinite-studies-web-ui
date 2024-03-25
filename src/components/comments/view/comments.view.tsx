import * as React from "react"
import { FeedComment } from "../../../services/feed/feed.service"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentCreate from "../create/comments.create"
import CommentEdit from "../edit/comments.edit"
import CommentLink from "../link/comments.link"
import { useTranslation } from "gatsby-plugin-react-i18next"
import DateFormatted from "../../date/date.formatted"
import MarkDown from "../../markdown/markdown"
import { COMMENTS_SERVICE, COMMENT_STATES, Comment } from "../../../services/comments/comments.service"
import StyledLinkButton from "../../buttons/styled.link.button"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { USERS_SERVICE } from "../../../services/users/users.service"
import Overlay from "../../overlay/overlay"

const CommentView = (props: {
  postUuid: string,
  comment: FeedComment,
  index: number,
  onReplyCommentBtnClick: () => void,
  onEditCommentBtnClick: () => void,
  renderedCreateCommentFormIndex: number,
  setRenderedCreateCommentFormIndex: (v: number) => void,
  renderedEditCommentFormIndex: number,
  setRenderedEditCommentFormIndex: (v: number) => void,
  getCommentIndex: (linkedCommentId: number) => number
}) => {
  const { t } = useTranslation()
  const [profile] = useProfile()
  const [isLoading, setIsLoading] = React.useState(false)
  const [comment, setComment] = React.useState({} as Comment)
  const [linkedComment, setLinkedComment] = React.useState({} as Comment)

  const handleEditEvent = () => {
    props.onReplyCommentBtnClick()
    props.setRenderedCreateCommentFormIndex(-1)
    props.setRenderedEditCommentFormIndex(props.index)
  }

  const handleReplyEvent = () => {
    props.onEditCommentBtnClick()
    props.setRenderedCreateCommentFormIndex(props.index)
    props.setRenderedEditCommentFormIndex(-1)
  }

  //TODO: add using cache for getting loaded comments and linked comments
  const fetchComment = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      let response = await COMMENTS_SERVICE.get({ postUuid: props.postUuid, commentId: props.comment.Id })
      clearTimeout(timer)

      if (response.status !== 200) {
        return
      }
      let loadedComment = response.data as Comment

      response = await USERS_SERVICE.getUserName({ Uuid: loadedComment.AuthorUuid })
      if (response.status !== 200) {
        return
      }

      loadedComment.AuthorName = response.data

      if (loadedComment.LinkedCommentId) {
        response = await COMMENTS_SERVICE.get({ postUuid: props.postUuid, commentId: loadedComment.LinkedCommentId })
        if (response.status !== 200) {
          return
        }

        let loadedLinkedComment = response.data as Comment

        response = await USERS_SERVICE.getUserName({ Uuid: loadedLinkedComment.AuthorUuid })
        if (response.status !== 200) {
          return
        }

        loadedLinkedComment.AuthorName = response.data

        setComment(loadedComment)
        setLinkedComment(loadedLinkedComment)
        return
      }

      setComment(loadedComment)
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchComment()
  }, [props.postUuid])

  if (isLoading || !comment || Object.keys(comment).length === 0) {
    return (
      <div>
        <Overlay />
      </div>
    )
  }

  if ((!profile && comment.State == COMMENT_STATES.NEW)
    || (profile && profile.Uuid !== comment.AuthorUuid && comment.State == COMMENT_STATES.NEW)) {
    return <></>
  }

  const EditButton = (
    <StyledLinkButton text={t("btn.edit")} onClick={handleEditEvent} href={"#edit_comment_form_" + props.index} />
  )
  const ReplyButton = (
    <StyledLinkButton text={t("btn.reply")} onClick={handleReplyEvent} href={"#reply_comment_form_" + props.index} />
  )

  if (props.renderedEditCommentFormIndex == props.index) {
    return (
      <CommentEdit id={"edit_comment_form_" + props.index} comment={comment} linkedComment={linkedComment}
        onCancel={() => {
          props.setRenderedCreateCommentFormIndex(-1)
          props.setRenderedEditCommentFormIndex(-1)
        }}
        getCommentIndex={props.getCommentIndex}
      />
    )
  }

  const renderLinkedCommentLink = () => {
    const linkedCommentIndex = props.getCommentIndex(linkedComment.Id)
    return (
      <div className="mb-3 text-xs">
        <span className="mr-1">{t("post.page.to") + ": "}</span>
        <span>{linkedComment?.AuthorName}</span>
        <span className="mr-1">,</span>
        <CommentLink postUuid={props.postUuid} commentIndex={linkedCommentIndex + 1 ?? 0} />
      </div>
    )
  }

  return (
    <>
      <div id={"comment_" + props.index} className="p-3 my-4 border-1 primary-content-block flex">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1 p-0 primary-comment-view-border">
            <div className="flex items-center flex-1">
              <div className="text-xs px-3 py-1 flex-1">{comment.AuthorName}</div>
            </div>
            <div className="flex items-center">
              {profile && comment.State == COMMENT_STATES.PUBLISHED ? ReplyButton : ""}
              {profile && profile.Uuid === comment.AuthorUuid && comment.State == COMMENT_STATES.NEW ? EditButton : ""}
            </div>
            <div className="flex flex-1 items-center justify-end">
              <div className="text-xs px-3 py-1"><DateFormatted date={comment.LastUpdateDate} /></div>
              <div className="text-xs">
                <CommentLink postUuid={props.postUuid} commentIndex={props.index} />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3">
            {linkedComment && Object.keys(linkedComment).length !== 0 && (
              renderLinkedCommentLink()
            )}
            <div>
              {(comment.State == COMMENT_STATES.BLOCKED) && (
                t("post.page.comment.blocked")
              )}
              {(comment.State != COMMENT_STATES.BLOCKED) && (
                <MarkDown text={comment.Text} className="lg:prose-base -my-2" />
              )}
            </div>
          </div>

          {(comment.State == COMMENT_STATES.NEW) && (
            <div className="flex flex-1 items-center justify-end">
              <div className="text-xs px-1 py-1">
                {t("post.page.comment.on.moderation")}
              </div>
            </div>)}
        </div>
      </div>

      {props.renderedCreateCommentFormIndex == props.index && (
        <CommentCreate id={"reply_comment_form_" + props.index} postUuid={props.postUuid} linkedCommentId={comment.Id} linkedCommentIndex={props.index}
          onCancel={() => {
            props.setRenderedCreateCommentFormIndex(-1)
            props.setRenderedEditCommentFormIndex(-1)
          }}
        />
      )}
    </>
  )
}

export default CommentView