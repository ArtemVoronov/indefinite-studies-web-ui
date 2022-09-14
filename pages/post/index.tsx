import type { NextPage } from "next"
import * as React from "react"
import PostCreate from "../../components/posts/create/posts.create"

const CreatePostPage: NextPage = () => {

    return (
        <div style={{ background: "#957DAD" }}>
            <PostCreate />
        </div>
    )
}

export default CreatePostPage