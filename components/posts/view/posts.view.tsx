import * as React from "react"
import { FullPostInfo } from "../../../services/feed/feed.service"
import Router from "next/router"
import MarkDown from "../../markdown/markdown"

const PostView = (props: { post?: FullPostInfo }) => {
    const { post } = props

    const handleEditEvent = () => {
        Router.push("/post/edit/" + post?.Post.PostId)
    }
    const getPostText = (post?: FullPostInfo): string => {
        return post?.Post.PostText ?? "No data"
    }
    return (
        <div className="max-w-3xl">
            <h1>{post?.Post.PostTopic}</h1>
            <MarkDown text={getPostText(post)} />

            {/* TODO: show btn only for author */}
            <button
                onClick={handleEditEvent}
                className="group relative flex justify-center rounded-md border border-transparent m-3 bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Edit
            </button>
        </div>

    )
}

export default PostView