import * as React from "react"
import { useForm } from "react-hook-form"
import { COMMENTS_SERVICE } from "../../../services/comments/comments.service"
import { navigate } from 'gatsby'
import { useProfile } from '../../hooks/use.profile.hook'
import CommentLink from "../link/comments.link"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"
import StyledTextArea from "../../form/styled.textarea"
import { useTranslation } from "gatsby-plugin-react-i18next"

const CommentCreate = (props: { id: string, postUuid: string, linkedCommentUuid: string, linkedCommentIndex?: number, onCancel: () => void }) => {
  const [profile] = useProfile()
  const { t } = useTranslation()
  const [showErrorModal] = useErrorModal()
  const { register, handleSubmit } = useForm()
  const { postUuid, linkedCommentUuid, linkedCommentIndex } = props

  const createComment = async (data: any) => {
    const { text } = data

    if (!profile) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }

    const response = await COMMENTS_SERVICE.create({ authorUuid: profile.Uuid, text, postUuid, linkedCommentUuid })

    if (response.status != 201) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.create.comment") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }
    window.location.reload()
  }

  return (
    <div id={props.id} className="primary-comment-edit-border">
      <div className="flex justify-center text-xl font-bold">{t("post.page.comment.header.new")}</div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(createComment)}>
        {linkedCommentIndex && (
          <div className="text-xs">
            {t("post.page.to") + ": "}
            <CommentLink postUuid={postUuid} commentIndex={linkedCommentIndex ?? 0} />
          </div>
        )}
        <div>
          <label htmlFor="text" className="block text-sm font-medium">
            {t("post.page.comment.text.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextArea id="text" required register={register} placeholder={t("post.page.comment.text.placeholder")} rows={10} />
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

export default CommentCreate