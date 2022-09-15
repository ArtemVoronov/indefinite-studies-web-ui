import * as React from "react"
import { TextField, Button } from "@mui/material"
import { POSTS_SERVICE } from "../../../services/posts/posts.service"
import Router from "next/router"
import { GetServerSidePropsContext } from "next"
import { isNil } from "../../../utils/utils"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"

const PostEdit = (props: { post: FullPostInfo }) => {
    const [topic, setTopic] = React.useState(props.post.Post.PostTopic)
    const [text, setText] = React.useState(props.post.Post.PostText)
    const [previewText, setPreviewText] = React.useState(props.post.Post.PostPreviewText)
    const { PostId, AuthorId } = props.post.Post


    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const response = await POSTS_SERVICE.update({ postId: PostId, authorId: AuthorId, text, topic, previewText })

        if (response.status == 200) {
            Router.push("/post/" + PostId)
        }
    }

    return (
        <div className="flex flex-col">
            <TextField
                id="topic-input" label="Topic" type="text" className="m-3" value={topic}
                onChange={e => setTopic(e.target.value)}
            />
            <TextField
                id="text-input" label="Text" type="text" className="m-3" value={text}
                onChange={e => setText(e.target.value)}
                multiline
                minRows={10}
            />
            <TextField
                id="text-input" label="PreviewText" type="text" className="m-3" value={previewText}
                onChange={e => setPreviewText(e.target.value)}
                multiline
                minRows={10}
            />
            <Button variant="contained" className="m-3" onClick={handleSubmit}>Update</Button>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id
    if (isNil(id)) {
        return { props: {} }
    }
    const response = await FEED_SERVICE.get({ postId: `${id}` })

    if (response.status === 200) {
        const post = response.data
        return { props: { post } }
    }

    return { props: {} }
}

export default PostEdit