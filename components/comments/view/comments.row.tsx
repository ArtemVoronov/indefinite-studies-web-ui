import * as React from "react"
import Link from "next/link"
import { FeedComment } from "../../../services/feed/feed.service"
import { useTranslation } from "next-i18next"
import Router from "next/router"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { COMMENTS_SERVICE, COMMENT_STATES } from "../../../services/comments/comments.service"

const CommentRow = (props: { comment: FeedComment }) => {
    const { t } = useTranslation()
    const [showErrorModal] = useErrorModal()
    const { PostUuid, AuthorUuid, CommentId, CommentUuid, AuthorName, CommentText } = props.comment

    const handleChangeStateEvent = async (state: string) => {
        const response = await COMMENTS_SERVICE.update({ authorUuid: AuthorUuid, postUuid: PostUuid, commentId: CommentId, commentUuid: CommentUuid, state })

        if (response.status == 200) {
            Router.reload()
        } else {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.comment") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
        }
    }

    const ModeratorActionsPanel = (
        <>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-0 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(COMMENT_STATES.NEW) }}
            >
                {t("btn.new")}
            </button>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(COMMENT_STATES.ON_MODERATION) }}
            >
                {t("btn.moderate")}
            </button >
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(COMMENT_STATES.PUBLISHED) }}
            >
                {t("btn.publish")}
            </button >
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(COMMENT_STATES.BLOCKED) }}
            >
                {t("btn.block")}
            </button >
        </>
    )

    return (
        <tr className="bg-white">
            <td className="text-center">
                <Link href={"/post/" + PostUuid}>
                    <a>
                        <div className="p-1 my-1 text-center text-indigo-600 hover:text-indigo-500">
                            {PostUuid}
                        </div>
                    </a>
                </Link>
            </td>
            <td className="text-center">
                {AuthorName}
            </td>
            <td className="text-center">
                {CommentText}
            </td>
            <td className="text-center">
                <div className="flex flex-col">
                    {ModeratorActionsPanel}
                </div>
            </td>
        </tr>
    )
}

export default CommentRow