import * as React from "react"
import { FeedComment } from "../../../services/feed/feed.service"
import CommentView from "../view/comments.view"


const CommentsList = (props: { comments: FeedComment[] }) => {
    const { comments } = props

    if (comments.length == 0) return (
        <div>
            No data
        </div>
    )

    return (
        <div className="w-full max-w-3xl">
            <div >
                {comments.map(function (p: FeedComment, idx) {
                    return (
                        <CommentView key={idx} comment={p} />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentsList