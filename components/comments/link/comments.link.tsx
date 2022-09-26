import * as React from "react"
import Link from "next/link"

const CommentLink = (props: { postId: number, commentIndex: number }) => {
    const { postId, commentIndex } = props
    return (
        <Link href={"/post/" + postId + "#comment_" + commentIndex}>
            <a className="text-indigo-600 hover:text-indigo-500">
                {"#" + commentIndex}
            </a>
        </Link>
    )
}

export default CommentLink