import * as React from 'react'
import { POSTS_SERVICE, Post } from '../../services/posts/posts.service'
import Link from 'next/link'

const DEFAULT_LIMIT = 25
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
            const response = await POSTS_SERVICE.getAll({ offset, limit: DEFAULT_LIMIT })
            clearTimeout(timer)
            if (response.status === 200) {
                const portion = response.data.Data
                if (portion.length < DEFAULT_LIMIT) {
                    setIsAllFetched(true)
                }
                const updatedList = posts.concat(portion)
                setPosts(updatedList)
                setOffset(offset + DEFAULT_LIMIT)
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPosts()
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (posts.length == 0) return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div>
                No data
            </div>
        </div>
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {posts.map(function (p: Post, idx) {
                return (
                    <Link key={idx} href={"/post/" + p.Id} >
                        <a>{p.Topic}</a>
                    </Link>
                )
            })}
        </div>
    )
}

export default PostsList