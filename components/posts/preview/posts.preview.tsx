import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"
import { useTranslation } from "next-i18next"
import { POSTS_SERVICE, POST_STATES, Tag } from "../../../services/posts/posts.service"
import Router from "next/router"
import { formatDate } from "../../../utils/i18n"

// TODO: add tag i18n
const PostPreview = (props: { post: FeedBlock, tableView?: boolean, tableViewAdmin?: boolean }) => {
    const { t, i18n } = useTranslation()
    const { PostUuid, PostTopic, PostPreviewText, AuthorName, CreateDate, CommentsCount, Tags } = props.post
    const [createDateFormatted, setCreateDateFormatted] = React.useState(formatDate(CreateDate, i18n.language))

    React.useEffect(() => {
        setCreateDateFormatted(formatDate(CreateDate, i18n.language))
    }, [i18n])

    const handleChangeStateEvent = async (state: string) => {
        const response = await POSTS_SERVICE.update({ postUuid: PostUuid, state: state })

        if (response.status == 200) {
            Router.reload()
        }
    }

    const handleEditEvent = () => {
        Router.push(`post/edit/${PostUuid}`)
    }

    const ModerationPanel = (
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


    const EditPanel = (
        <div className="flex flex-col">
            {!props.tableViewAdmin ? "" : ModerationPanel}
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleEditEvent}
            >
                {t("btn.edit")}
            </button>
        </div>
    )

    if (props.tableView) {
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
                    {EditPanel}
                </td>
            </tr>
        )
    }

    return (
        <div className="flex flex-col p-3 my-4 bg-white border-1 border-gray-100">
            <div className="mb-3 text-center text-2xl">
                <Link href={"/post/" + PostUuid} >
                    <a>
                        <h2 className="font-extrabold leading-tight text-4xl mt-0 mb-2 text-center text-indigo-600 hover:text-indigo-500">{PostTopic}</h2>
                    </a>
                </Link>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="text-xs">{createDateFormatted}</div>
                    <span className="mx-2">|</span>
                    <div className="text-xs">{AuthorName}</div>
                    <span className="mx-2">|</span>
                    <div className="text-xs">
                        <Link href={"/post/" + PostUuid} >
                            <a className="text-indigo-600 hover:text-indigo-500">{CommentsCount} {t("posts.page.comment.count")}</a>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center text-xs">
                    {Tags.map(function (tag: Tag, idx) {
                        return (
                            <Link href={"/posts/" + tag.Id + "/0"} key={idx}>
                                <a className="text-indigo-600 hover:text-indigo-500 mx-1">{tag.Name}</a>
                            </Link>
                        )
                    })}
                </div>

            </div>
            <div>
                <MarkDown text={PostPreviewText} />
            </div>
        </div >
    )
}

export default PostPreview