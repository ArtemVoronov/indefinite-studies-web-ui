import * as React from "react"
import { useForm } from "react-hook-form"
import { FeedComment, FeedCommentWithIndex } from "../../../services/feed/feed.service"
import { COMMENTS_SERVICE } from "../../../services/comments/comments.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentLink from "../link/comments.link"
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"
import StyledTextArea from "../../form/styled.textarea"

const CommentEdit = (props: { id: string, comment: FeedComment, linkedComment?: FeedCommentWithIndex, onCancel: () => void }) => {
    const [profile] = useProfile()
    const [showErrorModal] = useErrorModal()
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm()
    const { comment } = props
    const { PostUuid, CommentId, CommentUuid, CommentText } = comment

    const updateComment = async (data: any) => {
        const { text } = data

        if (!profile) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }

        const response = await COMMENTS_SERVICE.update({ authorUuid: profile.Uuid, postUuid: PostUuid, commentId: CommentId, commentUuid: CommentUuid, text })

        if (response.status != 200) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.comment") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }
        Router.reload()
    }

    return (
        <div id={props.id} className="border-dashed border-gray-500 border-2 p-4 rounded-lg my-2">
            <div className="flex justify-center">{t("post.page.comment.header.edit")}</div>
            <form className="mt-1 space-y-4" onSubmit={handleSubmit(updateComment)}>
                {props.linkedComment && (
                    <div className="text-xs">
                        {t("post.page.to") + ": "}
                        <CommentLink postUuid={PostUuid} commentIndex={props.linkedComment?.Index + 1 ?? 0} />
                    </div>
                )}
                <div>
                    <label htmlFor="text" className="block text-sm font-medium">
                        {t("post.page.comment.text.label")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <StyledTextArea id="text" required register={register} placeholder={t("post.page.comment.text.placeholder")} rows={10} defaultValue={CommentText} />
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