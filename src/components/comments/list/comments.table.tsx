import * as React from "react"
import { FEED_SERVICE, FeedComment } from "../../../services/feed/feed.service"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { useTranslation } from "gatsby-plugin-react-i18next"
import CommentRow from "../view/comments.row"
import StyledLinkButton from "../../buttons/styled.link.button"

const DEFAULT_MAX_COMMENTS_PER_PAGE = 10

const CommentsTable = (props: { page: string, commentState: string, pageSize?: number, onNavigate?: (page: number) => void }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [comments, setComments] = React.useState([])
    const [loadedCount, setLoadedCount] = React.useState(0)
    const { t } = useTranslation()
    const MAX_COMMENTS_PER_PAGE = props.pageSize ? props.pageSize : DEFAULT_MAX_COMMENTS_PER_PAGE
    const LIMIT = MAX_COMMENTS_PER_PAGE + 1

    const fetchComments = async () => {
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await FEED_SERVICE.getComments({ offset: parseInt(props.page) * MAX_COMMENTS_PER_PAGE, limit: LIMIT, state: props.commentState })
            clearTimeout(timer)
            if (response.status === 200) {
                const portion = response.data.Data
                const count = response.data.Count
                setLoadedCount(count)
                if (count > MAX_COMMENTS_PER_PAGE) {
                    setComments(portion.slice(0, MAX_COMMENTS_PER_PAGE))
                } else {
                    setComments(portion)
                }
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchComments()
    }, [props.page, props.commentState, props.pageSize])

    const navigation = (
        <div className="flex justify-center p-0 my-0 border-b-2 primary-content-block"
            style={{ display: (comments.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
            <StyledLinkButton
                text={t("btn.prev")} icon={<ArrowLeftIcon />}
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) - 1) : "" }}
                style={{ display: props.page == "0" ? "none" : undefined }}
            />
            <div className="flex-1" />
            <StyledLinkButton
                text={t("btn.next")} icon={<ArrowRightIcon />}
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) + 1) : "" }}
                style={{ display: (comments.length + 1) != loadedCount ? "none" : undefined }}
            />
        </div>
    )


    if (isLoading) return (
        <div>
            <Overlay />
        </div>
    )

    if (comments.length == 0) return (
        <div>
            {t("no.data")}
        </div>
    )

    return (
        <div className="flex flex-1 flex-col">
            {navigation}
            <table className="table-auto flex-1">
                <thead>
                    <tr className="primary-content-block">
                        <th className="w-64">{t("admin.page.comments.table.head.author")}</th>
                        <th>{t("admin.page.comments.table.head.text")}</th>
                        <th className="w-64">{t("admin.page.comments.table.head.action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(function (p: FeedComment, idx) {
                        return (
                            <CommentRow key={idx} comment={p} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CommentsTable