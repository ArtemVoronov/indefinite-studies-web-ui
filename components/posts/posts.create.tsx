import * as React from 'react'
import { TextField, Button } from '@mui/material'
import { POSTS_SERVICE } from '../../services/posts/posts-service'
import Router from 'next/router'

const PostCreate = () => {
    const [topic, setTopic] = React.useState('');
    const [text, setText] = React.useState('');


    const handleSubmit = async (event: any) => {
        event.preventDefault()

        // TODO: add getting user id at authenication
        const response = await POSTS_SERVICE.create({ authorId: 1, text, topic })

        if (response.status == 201) {
            Router.push("/post/" + response.data)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                id="topic-input" label="Topic" type="text" style={{ margin: "10px" }}
                onChange={e => setTopic(e.target.value)}
            />
            <TextField
                id="text-input" label="Text" type="text" style={{ margin: "10px" }}
                onChange={e => setText(e.target.value)}
                multiline
                minRows={10}
            />
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleSubmit}>Create</Button>
        </div>
    )
}

export default PostCreate