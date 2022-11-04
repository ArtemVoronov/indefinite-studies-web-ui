import * as React from "react"
import { FeedComment } from "../../../services/feed/feed.service"
import { useTranslation } from "next-i18next"
import Router from "next/router"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { COMMENTS_SERVICE, COMMENT_STATES } from "../../../services/comments/comments.service"
import StyledLinkButtonWithToolTip from "../../buttons/button.with.tooltip"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon } from "@heroicons/react/20/solid"
import StyledLink from "../../buttons/styled.link"

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
            <StyledLinkButtonWithToolTip text={t("btn.new")} action={() => { handleChangeStateEvent(COMMENT_STATES.NEW) }} icon={<ArrowUturnLeftIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
            <StyledLinkButtonWithToolTip text={t("btn.moderate")} action={() => { handleChangeStateEvent(COMMENT_STATES.ON_MODERATION) }} icon={<BriefcaseIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
            <StyledLinkButtonWithToolTip text={t("btn.publish")} action={() => { handleChangeStateEvent(COMMENT_STATES.PUBLISHED) }} icon={<BookOpenIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
            <StyledLinkButtonWithToolTip text={t("btn.edit")} action={() => { handleChangeStateEvent(COMMENT_STATES.BLOCKED) }} icon={<NoSymbolIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
        </>
    )

    return (
        <tr className="primary-content-block">
            <td className="text-center w-64">
                {AuthorName}
            </td>
            <td className="text-center">
                {CommentText}
            </td>
            <td className="text-center w-64">
                <div className="flex">
                    {ModeratorActionsPanel}
                    <StyledLink href={"/post/" + PostUuid} text={t("btn.open")} />
                </div>
            </td>
        </tr>
    )
}

export default CommentRow