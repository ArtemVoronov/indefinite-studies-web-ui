import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostView from "../../components/posts/view/posts.view"
import { FEED_SERVICE_SERVER_SIDE, FullPostInfo } from "../../services/feed/feed.service"

const ViewPostPage: NextPage = (props: { post?: FullPostInfo }) => {
    const { post } = props

    return (
        <div className="w-full max-w-3xl">
            {!post ? "No data" : <PostView post={post} />}
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id
    if (!id) {
        return { props: {} }
    }

    const response = await FEED_SERVICE_SERVER_SIDE.get({ postId: `${id}` })

    if (response.status === 200) {
        const post = response.data
        return { props: { post } }
    }

    return { props: {} }
}
export default ViewPostPage