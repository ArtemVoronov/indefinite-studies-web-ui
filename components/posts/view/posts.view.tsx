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
import StyledLinkButton from "../../buttons/styled.link.button"
import StyledLink from "../../buttons/styled.link"

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
        <Link href="#new_comment_form">
            <StyledLinkButton
                text={t("post.page.btn.new.comment")}
                onClick={handleNewCommentEvent}
                classes="uppercase font-bold text-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            />
        </Link>
    )

    return (
        <div>
            <div className="p-3 my-4 bg-white border-1 border-gray-100 dark:bg-slate-400">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="text-xs"><DateFormatted date={CreateDate} /></div>
                        <span className="mx-2">|</span>
                        <div className="text-xs">{AuthorName}</div>
                    </div>
                    <div className="flex items-center text-xs">
                        {Tags.map(function (tag: Tag, idx) {
                            return (
                                <StyledLink href={"/posts/" + tag.Id + "/0"} text={tag.Name} key={idx} />
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
                    <CommentCreate id="new_comment_form" postUuid={PostUuid} linkedCommentUuid=""
                        onCancel={() => {
                            setShowCreateCommentForm(false)
                        }} />
                )}

                <CommentsList comments={post.Comments} commentsMap={post.CommentsMap}
                    onReplyCommentBtnClick={() => {
                        setShowCreateCommentForm(false)
                    }}
                    onEditCommentBtnClick={() => {
                        setShowCreateCommentForm(false)
                    }} />
            </div>
        </div>
    )
}

export default PostView