import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostView from "../../components/posts/view/posts.view"
import { FEED_SERVICE, FullPostInfo } from "../../services/feed/feed.service"

const ViewOrEditPostPage: NextPage = (props: { post?: FullPostInfo }) => {
    const { post } = props

    if (!post) return (
        <div className="bg-violet-200">
            No data
        </div>
    )

    return (
        <div className="bg-violet-200">
            <PostView post={post} />
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id
    if (!id) {
        return { props: {} }
    }
    const response = await FEED_SERVICE.get({ postId: `${id}` })

    if (response.status === 200) {
        const post = response.data
        return { props: { post } }
    }

    return { props: {} }
}

export default ViewOrEditPostPage