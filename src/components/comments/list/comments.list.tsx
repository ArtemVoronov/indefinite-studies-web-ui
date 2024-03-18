import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { FeedComment, FeedCommentsMap } from "../../../services/feed/feed.service"
import CommentView from "../view/comments.view"


const CommentsList = (props: {
    comments: FeedComment[], commentsMap: FeedCommentsMap, onReplyCommentBtnClick: () => void, onEditCommentBtnClick: () => void,
    renderedCreateCommentFormIndex: number,
    setRenderedCreateCommentFormIndex: (v: number) => void,
    renderedEditCommentFormIndex: number,
    setRenderedEditCommentFormIndex: (v: number) => void
}) => {
    const { t } = useTranslation()
    const { comments, commentsMap } = props

    if (comments.length == 0) return (
        <div className="w-full max-w-3xl">
            <div className="p-3 my-4 border-1 primary-content-block text-center ">
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
                            renderedCreateCommentFormIndex={props.renderedCreateCommentFormIndex}
                            setRenderedCreateCommentFormIndex={(v: number) => props.setRenderedCreateCommentFormIndex(v)}
                            renderedEditCommentFormIndex={props.renderedEditCommentFormIndex}
                            setRenderedEditCommentFormIndex={(v: number) => props.setRenderedEditCommentFormIndex(v)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentsList