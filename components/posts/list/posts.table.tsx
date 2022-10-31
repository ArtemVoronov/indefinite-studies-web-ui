import * as React from "react"
import { FEED_SERVICE, FeedBlock } from "../../../services/feed/feed.service"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { useTranslation } from "next-i18next"
import PostRow from "../preview/posts.row"

const DEFAULT_MAX_POSTS_PER_PAGE = 5

const PostsTable = (props: { tagId: string, page: string, postState: string, userUuid: string, withModeratorActions?: boolean, pageSize?: number, onNavigate?: (page: number) => void }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [loadedCount, setLoadedCount] = React.useState(0)
    const { t } = useTranslation()
    const MAX_POSTS_PER_PAGE = props.pageSize ? props.pageSize : DEFAULT_MAX_POSTS_PER_PAGE
    const LIMIT = MAX_POSTS_PER_PAGE + 1

    const fetchPosts = async () => {
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await FEED_SERVICE.getAll({ offset: parseInt(props.page) * MAX_POSTS_PER_PAGE, limit: LIMIT, tagId: props.tagId, state: props.postState, userUuid: props.userUuid })
            clearTimeout(timer)
            if (response.status === 200) {
                const portion = response.data.Data
                const count = response.data.Count
                setLoadedCount(count)
                if (count > MAX_POSTS_PER_PAGE) {
                    setPosts(portion.slice(0, MAX_POSTS_PER_PAGE))
                } else {
                    setPosts(portion)
                }
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPosts()
    }, [props.page, props.tagId, props.postState, props.pageSize])

    const navigation = (
        <div className="flex justify-center p-0 my-0 bg-white dark:bg-slate-400 border-b-2 dark:border-gray-800"
            style={{ display: (posts.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
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
                style={{ display: (posts.length + 1) != loadedCount ? "none" : undefined }}
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

    if (posts.length == 0) return (
        <div>
            {t("no.data")}
        </div>
    )

    return (
        <div className="flex flex-1 flex-col">
            {navigation}
            <table className="table-auto flex-1">
                <thead>
                    <tr className="bg-white dark:bg-slate-400">
                        <th>{t("posts.page.table.head.topic")}</th>
                        <th className="w-64">{t("posts.page.table.head.author")}</th>
                        <th className="w-64">{t("posts.page.table.head.action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(function (p: FeedBlock, idx) {
                        return (
                            <PostRow key={idx} post={p} withModeratorActions={props.withModeratorActions} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PostsTable