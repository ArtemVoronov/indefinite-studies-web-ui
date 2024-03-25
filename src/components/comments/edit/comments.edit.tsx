import * as React from "react"
import { useForm } from "react-hook-form"
import { COMMENTS_SERVICE, Comment } from "../../../services/comments/comments.service"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentLink from "../link/comments.link"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"
import StyledTextArea from "../../form/styled.textarea"
import { useTranslation } from "gatsby-plugin-react-i18next"

const CommentEdit = (props: {
  id: string,
  comment: Comment,
  linkedComment?: Comment,
  onCancel: () => void,
  getCommentIndex: (linkedCommentId: number) => number
}) => {
  const [profile] = useProfile()
  const [showErrorModal] = useErrorModal()
  const { t } = useTranslation()
  const { register, handleSubmit } = useForm()
  const { comment, linkedComment } = props

  const updateComment = async (data: any) => {
    const { text } = data

    if (!profile) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }

    const response = await COMMENTS_SERVICE.update({ authorUuid: profile.Uuid, postUuid: comment.PostUuid, commentId: comment.Id, text })

    if (response.status != 200) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.update.comment") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }
    window.location.reload()
  }

  const renderLinkedCommentLink = () => {
    if (!linkedComment) {
      return <></>
    }
    const linkedCommentIndex = props.getCommentIndex(linkedComment.Id)
    return (
      <div className="text-xs">
        {t("post.page.to") + ": "}
        <CommentLink postUuid={linkedComment.PostUuid} commentIndex={linkedCommentIndex + 1 ?? 0} />
      </div>
    )
  }

  return (
    <div id={props.id} className="primary-comment-edit-border">
      <div className="flex justify-center text-xl font-bold">{t("post.page.comment.header.edit")}</div>
      <form className="mt-1 space-y-4" onSubmit={handleSubmit(updateComment)}>
        {linkedComment && (
          renderLinkedCommentLink()
        )}
        <div>
          <label htmlFor="text" className="block text-sm font-medium">
            {t("post.page.comment.text.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextArea id="text" required register={register} placeholder={t("post.page.comment.text.placeholder")} rows={10} defaultValue={comment.Text} />
          </div>
        </div>

        <div className="flex justify-center">
          <StyledButton text={t("btn.submit")} />
        </div>
      </form>
      <div className="flex justify-center">
        <StyledButton text={t("btn.cancel")} onClick={props.onCancel} />
      </div>

    </div>
  )
}

export default CommentEdit