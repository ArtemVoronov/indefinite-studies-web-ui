import * as React from "react"
import { FEED_SERVICE, FeedComment } from "../../../services/feed/feed.service"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { useTranslation } from "next-i18next"
import CommentRow from "../view/comments.row"

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
        <div className="flex justify-center p-3 my-4 bg-white border-b-2 border-gray-100"
            style={{ display: (comments.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
            <a
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) - 1) : "" }}
                style={{ display: props.page == "0" ? "none" : undefined }}
                className="cursor-pointer text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
                {t("btn.prev")}
                <ArrowLeftIcon />
            </a>
            <div className="flex-1" />
            <a
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) + 1) : "" }}
                style={{ display: (comments.length + 1) != loadedCount ? "none" : undefined }}
                className="cursor-pointer text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
                {t("btn.next")}
                <ArrowRightIcon />
            </a>
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
                    <tr className="bg-white">
                        <th>{t("admin.page.comments.table.head.uuid")}</th>
                        <th>{t("admin.page.comments.table.head.author")}</th>
                        <th>{t("admin.page.comments.table.head.text")}</th>
                        <th>{t("admin.page.comments.table.head.action")}</th>
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