import * as React from 'react'
import { TextField, Button } from '@mui/material'
import { POSTS_SERVICE, Post } from '../../services/posts/posts-service'
import Router from 'next/router'

const PostEdit = (props: { post: Post }) => {
    const [topic, setTopic] = React.useState(props.post.Topic);
    const [text, setText] = React.useState(props.post.Text);
    const { Id, AuthorId } = props.post


    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const response = await POSTS_SERVICE.update({ postId: Id, authorId: AuthorId, text, topic })

        if (response.status == 200) {
            Router.push("/post/" + Id)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                id="topic-input" label="Topic" type="text" style={{ margin: "10px" }} value={topic}
                onChange={e => setTopic(e.target.value)}
            />
            <TextField
                id="text-input" label="Text" type="text" style={{ margin: "10px" }} value={text}
                onChange={e => setText(e.target.value)}
                multiline
                minRows={10}
            />
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleSubmit}>Update</Button>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id
    const response = await POSTS_SERVICE.get({ postId: id })

    if (response.status === 200) {
        const post = response.data
        console.log("post: ", post)
        return { props: { post } }
    }

    return { props: {} }
}

export default PostEdit