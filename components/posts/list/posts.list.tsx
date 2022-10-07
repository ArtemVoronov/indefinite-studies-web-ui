import * as React from "react"
import { FEED_SERVICE, FeedBlock } from "../../../services/feed/feed.service"
import PostPreview from "../preview/posts.preview"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { useTranslation } from "next-i18next"

const DEFAULT_LIMIT = 5

const PostsList = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)
    const { t } = useTranslation()

    const fetchPosts = async () => {
        if (isAllFetched) {
            return
        }
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await FEED_SERVICE.getAll({ offset, limit: DEFAULT_LIMIT })
            clearTimeout(timer)
            if (response.status === 200) {
                const portion = response.data.Data
                if (response.data.Count != 0) {
                    setPosts(portion)
                }
                if (portion.length < DEFAULT_LIMIT) {
                    setIsAllFetched(true)
                }
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    const next = () => {
        if (isAllFetched) {
            return
        }
        setOffset(offset + DEFAULT_LIMIT)
    }

    const prev = () => {
        let newOffest = offset - DEFAULT_LIMIT
        if (newOffest < 0) {
            newOffest = 0
        }
        setOffset(newOffest)
        setIsAllFetched(false)
    }

    React.useEffect(() => {
        fetchPosts()
    }, [offset])


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
        <div className="w-full max-w-3xl">
            <div >
                {posts.map(function (p: FeedBlock, idx) {
                    return (
                        <PostPreview key={idx} post={p} />
                    )
                })}
            </div>
            <div className="flex justify-center p-3 my-4 bg-white border-b-2 border-gray-100">
                <button
                    onClick={prev}
                    style={{ display: offset == 0 ? "none" : undefined }}
                    className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    <div>
                        {t("btn.prev")}
                    </div>
                    <ArrowLeftIcon />
                </button>
                <div className="flex-1" />
                <button
                    onClick={next}
                    style={{ display: isAllFetched ? "none" : undefined }}
                    className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    <div>
                        {t("btn.next")}
                    </div>
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    )
}

export default PostsList