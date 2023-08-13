import * as React from "react"
import { FeedBlock } from "../../../services/feed/feed.service"
import MarkDown from "../../markdown/markdown"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Tag } from "../../../services/posts/posts.service"
import DateFormatted from "../../date/date.formatted"
import StyledLink from "../../buttons/styled.link"

// TODO: add tag i18n
const PostPreview = (props: { post: FeedBlock }) => {
    const { t } = useTranslation()
    const { PostUuid, PostTopic, PostPreviewText, AuthorName, CreateDate, CommentsCount, Tags } = props.post

    const getCommentsCountText = (): string => {
        let commentsWord = ""
        if (CommentsCount == 1) {
            commentsWord = t("posts.page.comment.count.1")
        } else if (CommentsCount == 2 || CommentsCount == 3 || CommentsCount == 4) {
            commentsWord = t("posts.page.comment.count.2.3.4")
        } else {
            commentsWord = t("posts.page.comment.count")
        }
        return CommentsCount + " " + commentsWord
    }

    return (
        <div className="flex flex-col p-3 my-4 border-1 primary-content-block">
            <div className="mb-3 text-center text-2xl">
                <StyledLink href={"/post/" + PostUuid} text={PostTopic} classes="font-extrabold leading-tight text-4xl mt-0 mb-2 text-center" />
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="text-xs"><DateFormatted date={CreateDate} /></div>
                    <span className="mx-2">|</span>
                    <div className="text-xs">{AuthorName}</div>
                    <span className="mx-2">|</span>
                    <div className="text-xs">
                        {/* TODO: fix text for 0, 1, 2, multiple comments cases in different locales */}
                        <StyledLink href={"/post/" + PostUuid} text={getCommentsCountText()} />
                    </div>
                </div>
                <div className="flex items-center text-xs">
                    {Tags.map(function (tag: Tag, idx) {
                        return (
                            <StyledLink href={"/posts/" + tag.Id + "/0"} text={tag.Name} key={idx} classes="ml-2" />
                        )
                    })}
                </div>

            </div>
            <div>
                <MarkDown text={PostPreviewText} />
            </div>
        </div >
    )
}

export default PostPreview