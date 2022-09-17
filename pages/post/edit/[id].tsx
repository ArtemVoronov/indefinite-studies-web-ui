import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostEdit from "../../../components/posts/edit/posts.edit"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"
import Router from "next/router"

const EditPostPage: NextPage = (props: { post?: FullPostInfo }) => {
    const { post } = props

    return (
        <div className="w-full max-w-3xl">
            {!post ? "No data" : <PostEdit post={post} onCancel={() => { Router.push("/post/" + post.Post.PostId) }} />}
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

export default EditPostPage