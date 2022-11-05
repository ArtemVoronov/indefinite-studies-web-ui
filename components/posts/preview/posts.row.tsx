import * as React from "react"
import { FeedBlock } from "../../../services/feed/feed.service"
import { useTranslation } from "next-i18next"
import { POSTS_SERVICE, POST_STATES } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon, PencilIcon } from "@heroicons/react/24/solid"
import StyledLinkButtonWithToolTip from "../../buttons/button.with.tooltip"
import StyledLink from "../../buttons/styled.link"

const PostRow = (props: { post: FeedBlock, withModeratorActions?: boolean }) => {
    const { t } = useTranslation()
    const [showErrorModal] = useErrorModal()
    const { PostUuid, PostTopic, AuthorName } = props.post
    const handleChangeStateEvent = async (state: string) => {
        const response = await POSTS_SERVICE.update({ postUuid: PostUuid, state: state })

        if (response.status == 200) {
            Router.reload()
        } else {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.post") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
        }
    }

    const handleEditEvent = () => {
        Router.push(`post/edit/${PostUuid}`)
    }

    const ModeratorActionsPanel = (
        <>
            <StyledLinkButtonWithToolTip text={t("btn.new")} action={() => { handleChangeStateEvent(POST_STATES.NEW) }} icon={<ArrowUturnLeftIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" />} />
            <StyledLinkButtonWithToolTip text={t("btn.moderate")} action={() => { handleChangeStateEvent(POST_STATES.ON_MODERATION) }} icon={<BriefcaseIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" />} />
            <StyledLinkButtonWithToolTip text={t("btn.publish")} action={() => { handleChangeStateEvent(POST_STATES.PUBLISHED) }} icon={<BookOpenIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" />} />
            <StyledLinkButtonWithToolTip text={t("btn.edit")} action={() => { handleChangeStateEvent(POST_STATES.BLOCKED) }} icon={<NoSymbolIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" />} />
        </>
    )

    return (
        <tr className="primary-content-block">
            <td className="text-center">
                <StyledLink href={"/post/" + PostUuid} text={PostTopic} classes="p-1 my-1 text-center" />
            </td>
            <td className="text-center w-64">
                {AuthorName}
            </td>
            <td className="text-center w-64">
                <div className="flex justify-center">
                    {!props.withModeratorActions ? "" : ModeratorActionsPanel}
                    <StyledLinkButtonWithToolTip text={t("btn.edit")} action={handleEditEvent} icon={<PencilIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" />} />
                </div>
            </td>
        </tr>
    )
}

export default PostRow