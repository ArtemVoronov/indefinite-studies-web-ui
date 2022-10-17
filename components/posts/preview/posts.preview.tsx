import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"
import moment from "moment"
import { useTranslation } from "next-i18next"
import { Tag } from "../../../services/posts/posts.service"

const PostPreview = (props: { post: FeedBlock, tableView?: boolean }) => {
    const { t } = useTranslation()
    const { PostUuid, PostTopic, PostPreviewText, AuthorName, CreateDate, CommentsCount, Tags } = props.post

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
            </tr>
        )
    }

    // TODO: add tag i18n
    // TODO: add date format i18n
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
                    <div className="text-xs">{moment(CreateDate).format('MMMM Do YYYY, hh:mm')}</div>
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
        </div>
    )
}

export default PostPreview