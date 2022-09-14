import * as React from 'react'
import Link from 'next/link'
import { FeedBlock } from '../../../services/feed/feed.service'
import MarkDown from '../../markdown/markdown'
import styles from "./post.preview.module.css"

const PostPreview = (props: { post: FeedBlock }) => {
    const { post } = props

    return (
        <div className={styles["post-preview-wrapper"]}>
            <div className={styles["topic"]}>
                <Link href={"/post/" + post.PostId} >
                    <a>{post.PostTopic}</a>
                </Link>
            </div>
            <div className={styles["metadata"]}>
                <div>{new Date(post.CreateDate).toLocaleString()}</div>
                <div>{post.AuthorName}</div>
                <div>
                    <Link href={"/post/" + post.PostId} >
                        <a>{post.CommentsCount} comments</a>
                    </Link>
                </div>
            </div>
            <div className={styles["preview-text"]}>
                <MarkDown text={post.PostPreviewText} />
            </div>
        </div>

    )
}

export default PostPreview