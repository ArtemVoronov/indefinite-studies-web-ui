import * as React from "react"
import { FeedComment, FeedCommentWithIndex } from "../../../services/feed/feed.service"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentCreate from "../create/comments.create"
import moment from "moment"
import CommentEdit from "../edit/comments.edit"
import CommentLink from "../link/comments.link"
import { useTranslation } from "next-i18next"
import DateFormatted from "../../date/date.formatted"

// TODO: add markdown for comment text
const CommentView = (props: { comment: FeedComment, linkedComment?: FeedCommentWithIndex, index: number }) => {
    const { t } = useTranslation()
    const [showReplyCommentForm, setShowReplyCommentForm] = React.useState(false)
    const [showEditCommentForm, setShowEditCommentForm] = React.useState(false)
    const [profile] = useProfile()
    const { CommentUuid, AuthorUuid, CommentText, AuthorName, LastUpdateDate, PostUuid } = props.comment
    moment.locale("ru")

    const handleEditEvent = () => {
        setShowEditCommentForm(true)
    }

    const handleReplyEvent = () => {
        setShowReplyCommentForm(true)
    }

    const EditButton = (
        <>
            <span className="mx-1">|</span>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent uppercase px-3 py-1 text-xs outline-none focus:outline-none ease-linear transition-all duration-150"
                onClick={handleEditEvent}
            >
                {t("btn.edit")}
            </button>
        </>
    )
    const ReplyButton = (
        <>
            <span className="mx-1">|</span>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent uppercase px-3 py-1 text-xs outline-none focus:outline-none ease-linear transition-all duration-150"
                onClick={handleReplyEvent}
            >
                {t("btn.reply")}
            </button>
        </>
    )

    if (showEditCommentForm) {
        return (
            <CommentEdit comment={props.comment} linkedComment={props.linkedComment} onCancel={() => { setShowEditCommentForm(false) }} />
        )
    }

    return (
        <>
            <div id={"comment_" + props.index} className="p-3 my-4 bg-white border-1 border-gray-100 flex">
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-1 p-0 border-b-2">
                        <div className="flex items-center my-1">
                            <div className="text-xs px-3 py-1">{AuthorName}</div>
                            <span className="mx-1">|</span>
                            <div className="text-xs px-3 py-1"><DateFormatted date={LastUpdateDate} /></div>
                            {!profile ? "" : ReplyButton}
                            {!profile || profile.Uuid != AuthorUuid ? "" : EditButton}
                        </div>
                        <div className="flex flex-1 items-center justify-end">
                            <div className="text-xs">
                                <CommentLink postUuid={PostUuid} commentIndex={props.index} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-3">
                        <div className="mb-3">
                            {props.linkedComment && (
                                <div className="text-xs">
                                    <span className="mr-1">{t("post.page.to") + ": "}</span>
                                    <span>{props.linkedComment?.AuthorName}</span>
                                    <span className="mr-1">,</span>
                                    <CommentLink postUuid={PostUuid} commentIndex={props.linkedComment?.Index + 1 ?? 0} />
                                </div>
                            )}
                        </div>
                        <div>
                            {CommentText}
                        </div>
                    </div>
                </div>
            </div>

            {showReplyCommentForm && (
                <CommentCreate postUuid={PostUuid} linkedCommentUuid={CommentUuid} linkedCommentIndex={props.index} onCancel={() => { setShowReplyCommentForm(false) }} />
            )}
        </>
    )
}

export default CommentView