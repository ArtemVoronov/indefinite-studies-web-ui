import * as React from "react"
import Link from "next/link"

const CommentLink = (props: { postUuid: string, commentIndex: number }) => {
    const { postUuid, commentIndex } = props
    return (
        <Link href={"/post/" + postUuid + "#comment_" + commentIndex}>
            <a className="text-indigo-600 hover:text-indigo-500">
                {"#" + commentIndex}
            </a>
        </Link>
    )
}

export default CommentLink