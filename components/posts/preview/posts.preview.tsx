import * as React from "react"
import Link from "next/link"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"

const PostPreview = (props: { post: FeedBlock }) => {
    const { post } = props

    return (
        <div className="flex flex-col p-3">
            <div className="mb-3 text-center text-2xl">
                <Link href={"/post/" + post.PostId} >
                    <a>{post.PostTopic}</a>
                </Link>
            </div>
            <div className="flex justify-between">
                <div>{new Date(post.CreateDate).toLocaleString()}</div>
                <div>{post.AuthorName}</div>
                <div>
                    <Link href={"/post/" + post.PostId} >
                        <a>{post.CommentsCount} comments</a>
                    </Link>
                </div>
            </div>
            <div>
                <MarkDown text={post.PostPreviewText} />
            </div>
        </div>

    )
}

export default PostPreview