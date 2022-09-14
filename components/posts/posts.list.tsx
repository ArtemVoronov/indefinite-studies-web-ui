import * as React from 'react'
import { FEED_SERVICE, FeedBlock } from '../../services/feed/feed.service'
import Link from 'next/link'
import { Button } from '@mui/material'

const DEFAULT_LIMIT = 7
const SPIN_ICON_SHOWING_TIMEOUT = 500

const PostsList = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)

    async function fetchPosts() {
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

    React.useEffect(() => {
        fetchPosts()
    }, [offset])


    if (isLoading) return <p>Loading...</p>
    if (posts.length == 0) return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div>
                No data
            </div>
        </div>
    )

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {posts.map(function (p: FeedBlock, idx) {
                    return (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                            <div style={{ padding: "10px", textAlign: "center" }}>
                                <Link href={"/post/" + p.PostId} >
                                    <a>{p.PostTopic}</a>
                                </Link>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div>{new Date(p.CreateDate).toLocaleString()}</div>
                                <div style={{ padding: "0 10px" }}>{p.AuthorName}</div>
                                <div>{p.CommentsCount} comments</div>
                            </div>
                            {/* TODO: markdown for preview text */}
                            <div style={{ padding: "10px" }}>
                                {p.PostPreviewText}
                            </div>
                        </div >
                    )
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }} hidden={offset == 0}>
                <Button
                    variant="contained"
                    style={{ margin: "10px", display: offset == 0 ? 'none' : undefined }}
                    onClick={() => {
                        console.log("prev")
                        let newOffest = offset - DEFAULT_LIMIT
                        if (newOffest < 0) {
                            newOffest = 0
                        }
                        setOffset(newOffest)
                        setIsAllFetched(false)
                    }}
                >
                    Prev
                </Button>
                <Button
                    variant="contained"
                    style={{ margin: "10px", display: isAllFetched ? 'none' : undefined }}
                    onClick={() => {
                        console.log("next")
                        if (isAllFetched) {
                            return
                        }
                        setOffset(offset + DEFAULT_LIMIT)
                    }}
                >
                    Next
                </Button>

            </div>
        </div>
    )
}

export default PostsList