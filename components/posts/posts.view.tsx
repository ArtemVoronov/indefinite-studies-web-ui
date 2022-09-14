import * as React from 'react'
import { FullPostInfo } from '../../services/feed/feed.service'
import { Button } from '@mui/material'
import Router from 'next/router'
import MarkDown from '../markdown/markdown'
import styles from "../../styles/post.view.module.css"

const PostView = (props: { post?: FullPostInfo }) => {
    const { post } = props

    const handleEditEvent = () => {
        Router.push("/post/edit/" + post?.Post.PostId)
    }
    const getPostText = (post?: FullPostInfo): string => {
        return post?.Post.PostText ?? "No data"
    }
    return (
        <div className={styles["post-view-wrapper"]}>
            <h1>{post?.Post.PostTopic}</h1>
            <MarkDown text={getPostText(post)} />
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleEditEvent}>Edit</Button>
        </div>

    )
}

export default PostView