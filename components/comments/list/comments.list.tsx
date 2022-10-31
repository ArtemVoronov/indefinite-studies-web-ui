import { useTranslation } from "next-i18next"
import * as React from "react"
import { FeedComment, FeedCommentsMap } from "../../../services/feed/feed.service"
import CommentView from "../view/comments.view"


const CommentsList = (props: { comments: FeedComment[], commentsMap: FeedCommentsMap, onReplyCommentBtnClick: () => void, onEditCommentBtnClick: () => void }) => {
    const { t } = useTranslation()
    const [renderedFormIndex, setRenderedFormIndex] = React.useState(-1)
    const { comments, commentsMap } = props

    if (comments.length == 0) return (
        <div className="w-full max-w-3xl">
            <div className="p-3 my-4 bg-white dark:bg-slate-400 border-1 border-gray-100 dark:border-gray-800 text-center ">
                {t("posts.page.no.comments")}
            </div>
        </div>
    )

    return (
        <div className="w-full max-w-3xl">
            <div>
                {comments.map(function (p: FeedComment, idx) {
                    return (
                        <CommentView
                            key={idx}
                            comment={p}
                            linkedComment={p.LinkedCommentUuid == "" ? undefined : commentsMap[p.LinkedCommentUuid]} index={idx + 1}
                            onReplyCommentBtnClick={props.onReplyCommentBtnClick}
                            onEditCommentBtnClick={props.onEditCommentBtnClick}
                            renderedFormIndex={renderedFormIndex}
                            setRenderedFormIndex={(v: number) => setRenderedFormIndex(v)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentsList