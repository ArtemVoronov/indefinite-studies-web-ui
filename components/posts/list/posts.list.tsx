import * as React from "react"
import { FEED_SERVICE, FeedBlock } from "../../../services/feed/feed.service"
import { Button } from "@mui/material"
import PostPreview from "../preview/posts.preview"

const DEFAULT_LIMIT = 7
const SPIN_ICON_SHOWING_TIMEOUT = 500

const PostsList = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)

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
            Loading...
        </div>
    )

    if (posts.length == 0) return (
        <div>
            No data
        </div>
    )

    return (
        <div>
            <div className="max-w-3xl">
                {posts.map(function (p: FeedBlock, idx) {
                    return (
                        <PostPreview key={idx} post={p} />
                    )
                })}
            </div>
            <div className="flex justify-center">
                <Button onClick={prev} style={{ display: offset == 0 ? "none" : undefined }} variant="contained" >
                    Prev
                </Button>
                <Button onClick={next} style={{ display: isAllFetched ? "none" : undefined }} variant="contained" >
                    Next
                </Button>

            </div>
        </div>
    )
}

export default PostsList