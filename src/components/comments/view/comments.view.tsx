import * as React from "react"
import { FeedComment, FeedCommentWithIndex } from "../../../services/feed/feed.service"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentCreate from "../create/comments.create"
import CommentEdit from "../edit/comments.edit"
import CommentLink from "../link/comments.link"
import { useTranslation } from "gatsby-plugin-react-i18next"
import DateFormatted from "../../date/date.formatted"
import MarkDown from "../../markdown/markdown"
import { COMMENT_STATES } from "../../../services/comments/comments.service"
import StyledLinkButton from "../../buttons/styled.link.button"

const CommentView = (props: {
  comment: FeedComment, linkedComment?: FeedCommentWithIndex, index: number,
  onReplyCommentBtnClick: () => void,
  onEditCommentBtnClick: () => void,
  renderedCreateCommentFormIndex: number,
  setRenderedCreateCommentFormIndex: (v: number) => void,
  renderedEditCommentFormIndex: number,
  setRenderedEditCommentFormIndex: (v: number) => void
}) => {
  const { t } = useTranslation()
  const [profile] = useProfile()
  const { CommentUuid, AuthorUuid, CommentText, AuthorName, LastUpdateDate, PostUuid, CommentState } = props.comment

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

  // TODO clean
  // const EditButton = (
  //     <Link href={"#edit_comment_form_" + props.index}>
  //         <StyledLinkButton text={t("btn.edit")} onClick={handleEditEvent} />
  //     </Link>
  // )
  // const ReplyButton = (
  //     <Link href={"#reply_comment_form_" + props.index}>
  //         <StyledLinkButton text={t("btn.reply")} onClick={handleReplyEvent} />
  //     </Link>
  // )


  const EditButton = (
    <StyledLinkButton text={t("btn.edit")} onClick={handleEditEvent} href={"#edit_comment_form_" + props.index} />
  )
  const ReplyButton = (
    <StyledLinkButton text={t("btn.reply")} onClick={handleReplyEvent} href={"#reply_comment_form_" + props.index} />
  )

  if (props.renderedEditCommentFormIndex == props.index) {
    return (
      <CommentEdit id={"edit_comment_form_" + props.index} comment={props.comment} linkedComment={props.linkedComment}
        onCancel={() => {
          props.setRenderedCreateCommentFormIndex(-1)
          props.setRenderedEditCommentFormIndex(-1)
        }}
      />
    )
  }

  return (
    <>
      <div id={"comment_" + props.index} className="p-3 my-4 border-1 primary-content-block flex">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1 p-0 primary-comment-view-border">
            <div className="flex items-center flex-1">
              <div className="text-xs px-3 py-1 flex-1">{AuthorName}</div>
            </div>
            <div className="flex items-center">
              {!profile ? "" : ReplyButton}
              {!profile || profile.Uuid != AuthorUuid ? "" : EditButton}
            </div>
            <div className="flex flex-1 items-center justify-end">
              <div className="text-xs px-3 py-1"><DateFormatted date={LastUpdateDate} /></div>
              <div className="text-xs">
                <CommentLink postUuid={PostUuid} commentIndex={props.index} />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3">
            {props.linkedComment && (
              <div className="mb-3 text-xs">
                <span className="mr-1">{t("post.page.to") + ": "}</span>
                <span>{props.linkedComment?.AuthorName}</span>
                <span className="mr-1">,</span>
                <CommentLink postUuid={PostUuid} commentIndex={props.linkedComment?.Index + 1 ?? 0} />
              </div>
            )}
            <div>
              {/* TODO: in future we can add moderation workflow via states: COMMENT_STATES.NEW, COMMENT_STATES.ON_MODERATION, COMMENT_STATES.PUBLISHED */}
              {(CommentState == COMMENT_STATES.BLOCKED) && (
                t("post.page.comment.blocked")
              )}
              {(CommentState != COMMENT_STATES.BLOCKED) && (
                <MarkDown text={CommentText} className="lg:prose-base -my-2" />
              )}
            </div>
          </div>
        </div>
      </div>

      {props.renderedCreateCommentFormIndex == props.index && (
        <CommentCreate id={"reply_comment_form_" + props.index} postUuid={PostUuid} linkedCommentUuid={CommentUuid} linkedCommentIndex={props.index}
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