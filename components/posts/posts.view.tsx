import * as React from 'react'
import { FullPostInfo } from '../../services/feed/feed.service'
import { Button } from '@mui/material'
import Router from 'next/router'
import md from "markdown-it"

const PostView = (props: { post?: FullPostInfo }) => {
    const { post } = props

    const handleEditEvent = () => {
        Router.push("/post/edit/" + post?.Post.PostId)
    }
    const getPostText = (post?: FullPostInfo): string => {
        return post?.Post.PostText ?? "No data"
    }
    return (
        <div style={{ flexDirection: "column" }}>
            <h1>{post?.Post.PostTopic}</h1>
            <div className='prose mx-auto'>
                <div dangerouslySetInnerHTML={{ __html: md().render(getPostText(post)) }} />
            </div>
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleEditEvent}>Edit</Button>
        </div>

    )
}

export default PostView