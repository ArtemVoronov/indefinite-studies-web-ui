import * as React from 'react'
import { Post } from '../../services/posts/posts-service'
import { isNil } from '../../utils/utils'
import { Button } from '@mui/material'
import Router from 'next/router'
import md from "markdown-it"

const PostView = (props: { post?: Post }) => {
    const { post } = props

    const handleEditEvent = () => {
        Router.push("/post/edit/" + post?.Id)
    }

    return (
        <div style={{ flexDirection: "column" }}>
            <h1>{post?.Topic}</h1>
            {/* <div>{post?.Text}</div> */}
            <div className='prose mx-auto'>
                <div dangerouslySetInnerHTML={{ __html: md().render(isNil(post) ? "No data" : post.Text) }} />
            </div>
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleEditEvent}>Edit</Button>
        </div>

    )
}

export default PostView