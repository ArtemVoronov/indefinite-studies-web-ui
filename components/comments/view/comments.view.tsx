import * as React from "react"
import { FeedComment, FeedCommentWithIndex } from "../../../services/feed/feed.service"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentCreate from "../create/comments.create"
import moment from "moment"
import CommentEdit from "../edit/comments.edit"
import CommentLink from "../link/comments.link"
import { useTranslation } from "next-i18next"

const CommentView = (props: { comment: FeedComment, linkedComment?: FeedCommentWithIndex, index: number }) => {
    const { t } = useTranslation()
    const [showReplyCommentForm, setShowReplyCommentForm] = React.useState(false)
    const [showEditCommentForm, setShowEditCommentForm] = React.useState(false)
    const [profile] = useProfile()
    const { CommentId, AuthorId, CommentText, AuthorName, LastUpdateDate, PostId } = props.comment

    const handleEditEvent = () => {
        setShowEditCommentForm(true)
    }

    const handleReplyEvent = () => {
        setShowReplyCommentForm(true)
    }

    const EditButton = (
        <>
            <span className="m-1">|</span>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent uppercase px-3 py-1 text-xs outline-none focus:outline-none ease-linear transition-all duration-150"
                onClick={handleEditEvent}
            >
                Edit
            </button>
        </>
    )
    const ReplyButton = (
        <>
            <span className="m-1">|</span>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent uppercase px-3 py-1 text-xs outline-none focus:outline-none ease-linear transition-all duration-150"
                onClick={handleReplyEvent}
            >
                Reply
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
                <div className="flex justify-center items-center p-3 border-r-2">
                    {AuthorName}
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-1 p-0 border-b-2">
                        <div className="flex items-center">
                            <div className="text-xs px-3">{moment(LastUpdateDate).format('MMMM Do YYYY, hh:mm')}</div>
                            {!profile ? "" : ReplyButton}
                            {!profile || profile.Id != AuthorId ? "" : EditButton}
                        </div>
                        <div className="flex flex-1 items-center justify-end">
                            <div className="text-xs">
                                <CommentLink postId={PostId} commentIndex={props.index} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-3">
                        <div className="mb-3">
                            {props.linkedComment && (
                                <div className="text-xs">
                                    <span className="mr-1">{"To: "}</span>
                                    <span>{props.linkedComment?.AuthorName}</span>
                                    <span className="mr-1">,</span>
                                    <CommentLink postId={PostId} commentIndex={props.linkedComment?.Index + 1 ?? 0} />
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
                <CommentCreate postId={PostId} linkedCommentId={CommentId} linkedCommentIndex={props.index} onCancel={() => { setShowReplyCommentForm(false) }} />
            )}
        </>
    )
}

export default CommentView