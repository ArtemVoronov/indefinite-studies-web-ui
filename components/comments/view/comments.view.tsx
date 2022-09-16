import * as React from "react"
import { FeedComment } from "../../../services/feed/feed.service"
import { useProfile } from '../../hooks/use.profile.hook'
import moment from "moment"

const CommentView = (props: { comment: FeedComment }) => {
    const [profile, setProfile] = useProfile()
    const { CommentId, AuthorId, CommentText, AuthorName, LastUpdateDate } = props.comment

    const handleEditEvent = () => {
        // TODO:
        console.log("update comment: " + CommentId)
    }
    const handleReplyEvent = () => {
        // TODO:
        console.log("reply to comment: " + CommentId)
    }

    const EditButton = (
        <>
            <span className="m-1">|</span>
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleEditEvent}
            >
                Edit
            </button>
        </>
    )
    const ReplyButton = (
        <button
            className="text-indigo-600 hover:text-indigo-500 background-transparent uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={handleReplyEvent}
        >
            Reply
        </button>
    )

    return (
        <div className="p-3 my-4 bg-white border-1 border-gray-100 flex">
            <div className="flex justify-center items-center p-3 border-r-2">
                {AuthorName}
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex p-0 border-b-2">
                    <div className="text-xs flex justify-start items-center px-3">{moment(LastUpdateDate).format('MMMM Do YYYY, hh:mm')}</div>
                    <span className="m-1">|</span>
                    {ReplyButton}
                    {!profile || profile.Id != AuthorId ? "" : EditButton}
                </div>
                <div className="flex p-3">
                    {CommentText}
                </div>
            </div>
        </div>

    )
}

export default CommentView