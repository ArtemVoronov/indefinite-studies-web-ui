import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"
import moment from "moment"
import { useTranslation } from "next-i18next"

const PostPreview = (props: { post: FeedBlock }) => {
    const { t } = useTranslation()
    const { PostUuid, PostTopic, PostPreviewText, AuthorName, CreateDate, CommentsCount, Tags } = props.post

    // TODO: add tag i18n
    // TODO: add date format i18n
    const getTag = (): string => {
        return Tags.length == 0 ? "" : Tags[0]
    }
    const getTagName = (): string => {
        return getTag()
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
                <div className="text-xs">
                    <Link href={"/posts/" + getTag() + "/0"}>
                        <a className="text-indigo-600 hover:text-indigo-500">{getTagName()}</a>
                    </Link>
                </div>

            </div>
            <div>
                <MarkDown text={PostPreviewText} />
            </div>
        </div>

    )
}

export default PostPreview