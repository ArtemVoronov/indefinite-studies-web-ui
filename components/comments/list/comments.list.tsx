import { useTranslation } from "next-i18next"
import * as React from "react"
import { FeedComment, FeedCommentsMap } from "../../../services/feed/feed.service"
import CommentView from "../view/comments.view"


const CommentsList = (props: { comments: FeedComment[], commentsMap: FeedCommentsMap }) => {
    const { t } = useTranslation()
    const { comments, commentsMap } = props

    if (comments.length == 0) return (
        <div className="w-full max-w-3xl">
            <div className="p-3 my-4 bg-white border-1 border-gray-100 text-center">
                No comments
            </div>
        </div>
    )

    return (
        <div className="w-full max-w-3xl">
            <div>
                {comments.map(function (p: FeedComment, idx) {
                    return (
                        <CommentView key={idx} comment={p} linkedComment={!p.LinkedCommentId ? undefined : commentsMap[p.LinkedCommentId]} index={idx + 1} />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentsList