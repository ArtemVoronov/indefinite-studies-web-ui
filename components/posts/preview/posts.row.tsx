import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import { useTranslation } from "next-i18next"
import { POSTS_SERVICE, POST_STATES } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon, PencilIcon } from "@heroicons/react/24/solid"
import ButtonWithToolTip from "../../buttons/button.wit.tooltip"

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
            <ButtonWithToolTip text={t("btn.new")} action={() => { handleChangeStateEvent(POST_STATES.NEW) }} icon={<ArrowUturnLeftIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
            <ButtonWithToolTip text={t("btn.moderate")} action={() => { handleChangeStateEvent(POST_STATES.ON_MODERATION) }} icon={<BriefcaseIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
            <ButtonWithToolTip text={t("btn.publish")} action={() => { handleChangeStateEvent(POST_STATES.PUBLISHED) }} icon={<BookOpenIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
            <ButtonWithToolTip text={t("btn.edit")} action={() => { handleChangeStateEvent(POST_STATES.BLOCKED) }} icon={<NoSymbolIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
        </>
    )

    return (
        <tr className="bg-white">
            <td className="text-center">
                <Link href={"/post/" + PostUuid}>
                    <a>
                        <div className="p-1 my-1 text-center text-indigo-600 hover:text-indigo-500">
                            {PostTopic}
                        </div>
                    </a>
                </Link>
            </td>
            <td className="text-center w-64">
                {AuthorName}
            </td>
            <td className="text-center w-64">
                <div className="flex justify-center">
                    {!props.withModeratorActions ? "" : ModeratorActionsPanel}
                    <ButtonWithToolTip text={t("btn.edit")} action={handleEditEvent} icon={<PencilIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />} />
                </div>
            </td>
        </tr>
    )
}

export default PostRow