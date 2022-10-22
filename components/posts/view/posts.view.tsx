import * as React from "react"
import MarkDown from "../../markdown/markdown"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentsList from "../../comments/list/comments.list"
import CommentCreate from "../../comments/create/comments.create"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"
import { useTranslation } from "next-i18next"
import { POST_STATES, Tag } from "../../../services/posts/posts.service"
import DateFormatted from "../../date/date.formatted"
import Link from "next/link"

// TODO: add closing edit/create comments (to fordbidd multuple edit/create forms showing)
const PostView = (props: { postUuid: string }) => {
    const { t } = useTranslation()
    const [profile] = useProfile()
    const [showCreateCommentForm, setShowCreateCommentForm] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [post, setPost] = React.useState({} as FullPostInfo)
    const { postUuid } = props

    const handleNewCommentEvent = () => {
        setShowCreateCommentForm(true)
    }

    const fetchPost = async () => {
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await FEED_SERVICE.get({ postUuid })
            clearTimeout(timer)
            if (response.status === 200) {
                const content = response.data as FullPostInfo
                if (content.Post.PostState === POST_STATES.PUBLISHED) {
                    setPost(response.data)
                }
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
            {t("no.data")}
        </div>
    )

    const { PostUuid, PostTopic, PostText, CreateDate, AuthorName, Tags } = post.Post

    const AddCommentButton = (
        <button
            className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={handleNewCommentEvent}
        >
            {t("post.page.btn.new.comment")}
        </button>
    )

    return (
        <div>
            <div className="p-3 my-4 bg-white border-1 border-gray-100">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="text-xs"><DateFormatted date={CreateDate} /></div>
                        <span className="mx-2">|</span>
                        <div className="text-xs">{AuthorName}</div>
                    </div>
                    <div className="flex items-center text-xs">
                        {Tags.map(function (tag: Tag, idx) {
                            return (
                                <Link href={"/posts/" + tag.Id + "/0"} key={idx}>
                                    <a className="text-indigo-600 hover:text-indigo-500 mx-1">{tag.Name}</a>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <h1 className="font-extrabold leading-tight text-6xl mt-0 mb-2 text-center">{PostTopic}</h1>
                <MarkDown text={PostText} />
            </div>
            <div className="mt-5">
                <div className="flex justify-between">
                    <h2 className="font-bold leading-tight text-3xl mt-0 mb-2 text-center">{t("post.page.comment.header")}</h2>
                    {!profile ? "" : AddCommentButton}
                </div>
                {showCreateCommentForm && (
                    <CommentCreate postUuid={PostUuid} linkedCommentUuid="" onCancel={() => { setShowCreateCommentForm(false) }} />
                )}
                <CommentsList comments={post.Comments} commentsMap={post.CommentsMap} />
            </div>
        </div>
    )
}

export default PostView