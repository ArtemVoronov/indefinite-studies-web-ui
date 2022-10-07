import * as React from "react"
import { ROLES } from "../../../services/users/users.service"
import MarkDown from "../../markdown/markdown"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentsList from "../../comments/list/comments.list"
import CommentCreate from "../../comments/create/comments.create"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"
import PostEdit from "../edit/posts.edit"
import { useTranslation } from "next-i18next"

const PostView = (props: { postId: number }) => {
    const { t } = useTranslationn()
    const [profile] = useProfile()
    const [showCreateCommentForm, setShowCreateCommentForm] = React.useState(false)
    const [showEditPostForm, setShowEditPostForm] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [post, setPost] = React.useState({} as FullPostInfo)
    const { postId } = props


    const handleEditEvent = () => {
        setShowEditPostForm(true)
    }

    const handleNewCommentEvent = () => {
        setShowCreateCommentForm(true)
    }

    const fetchPost = async () => {
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await FEED_SERVICE.get({ postId })
            clearTimeout(timer)
            if (response.status === 200) {
                setPost(response.data)
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPost()
    }, [])

    if (isLoading) return (
        <div>
            <Overlay />
        </div>
    )

    if (!post || Object.keys(post).length === 0) return (
        <div>
            No data
        </div>
    )

    if (showEditPostForm) return (
        <PostEdit post={post} onCancel={() => { setShowEditPostForm(false) }} />
    )

    const { PostId, PostTopic, PostText, AuthorId } = post.Post

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
                <CommentsList comments={post.Comments} commentsMap={post.CommentsMap} />
            </div>
        </div>
    )
}

export default PostView