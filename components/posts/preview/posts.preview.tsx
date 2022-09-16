import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"
import moment from "moment"

const PostPreview = (props: { post: FeedBlock }) => {
    const { PostId, PostTopic, PostPreviewText, AuthorName, CreateDate, CommentsCount } = props.post

    return (
        <div className="flex flex-col p-3 my-4 bg-white border-b-2 border-gray-100">
            <div className="mb-3 text-center text-2xl">
                <Link href={"/post/" + PostId} >
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
                        <Link href={"/post/" + PostId} >
                            <a className="text-indigo-600 hover:text-indigo-500">{CommentsCount} comments</a>
                        </Link>
                    </div>
                </div>
                {/* <div>
                    TODO: Tag
                </div> */}
            </div>
            <div>
                <MarkDown text={PostPreviewText} />
            </div>
        </div>

    )
}

export default PostPreview