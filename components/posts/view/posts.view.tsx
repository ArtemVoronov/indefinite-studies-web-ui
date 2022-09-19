import * as React from "react"
import { FullPostInfo } from "../../../services/feed/feed.service"
import { ROLES } from "../../../services/users/users.service"
import Router from "next/router"
import MarkDown from "../../markdown/markdown"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentsList from "../../comments/list/comments.list"
import CommentCreate from "../../comments/create/comments.create"

const PostView = (props: { post: FullPostInfo }) => {
    const [profile] = useProfile()
    const [showCreateCommentForm, setShowCreateCommentForm] = React.useState(false)
    const { PostId, PostTopic, PostText, AuthorId } = props.post.Post

    const handleEditEvent = () => {
        Router.push("/post/edit/" + PostId)
    }

    const handleNewCommentEvent = () => {
        setShowCreateCommentForm(true)
    }

    const EditPanel = (
        <div className="flex justify-end">
            <button
                className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleEditEvent}
            >
                Edit
            </button>
        </div>
    )

    const AddCommentButton = (
        <button
            className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={handleNewCommentEvent}
        >
            New Comment
        </button>
    )

    return (
        <div>
            <div className="p-3 my-4 bg-white border-1 border-gray-100">
                {!profile || profile.Id != AuthorId || profile.Role != ROLES.OWNER ? "" : EditPanel}
                <h1 className="font-extrabold leading-tight text-6xl mt-0 mb-2 text-center">{PostTopic}</h1>
                <MarkDown text={PostText} />
            </div>
            <div className="mt-5">
                <div className="flex justify-between">
                    <h2 className="font-bold leading-tight text-3xl mt-0 mb-2 text-center">Comments</h2>
                    {!profile ? "" : AddCommentButton}
                </div>
                {showCreateCommentForm && (
                    <CommentCreate postId={PostId} onCancel={() => { setShowCreateCommentForm(false) }} />
                )}
                <CommentsList comments={props.post.Comments} />
            </div>
        </div>
    )
}

export default PostView