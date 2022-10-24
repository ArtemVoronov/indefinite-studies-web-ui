import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import { useTranslation } from "next-i18next"
import { POSTS_SERVICE, POST_STATES } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useErrorModal } from "../../hooks/use.error.modal.hook"

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
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-0 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(POST_STATES.NEW) }}
            >
                {t("btn.new")}
            </button>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(POST_STATES.ON_MODERATION) }}
            >
                {t("btn.moderate")}
            </button >
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(POST_STATES.PUBLISHED) }}
            >
                {t("btn.publish")}
            </button >
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => { handleChangeStateEvent(POST_STATES.BLOCKED) }}
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
                {PostTopic}
            </td>
            <td className="text-center">
                {AuthorName}
            </td>
            <td className="text-center">
                <div className="flex flex-col">
                    {!props.withModeratorActions ? "" : ModeratorActionsPanel}
                    <button
                        className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={handleEditEvent}
                    >
                        {t("btn.edit")}
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default PostRow