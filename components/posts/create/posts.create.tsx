import * as React from 'react'
import { TextField, Button } from '@mui/material'
import { POSTS_SERVICE } from '../../../services/posts/posts.service'
import { USERS_SERVICE } from '../../../services/users/users.service'
import styles from "./post.create.module.css"
import Router from 'next/router'

const PostCreate = () => {
    const [topic, setTopic] = React.useState('');
    const [text, setText] = React.useState('');
    const [previewText, setPreviewText] = React.useState('');


    const handleSubmit = async (event: any) => {
        event.preventDefault()

        let response = await USERS_SERVICE.getMe()

        if (response.status != 200) {
            // TODO: show error
            console.log("unable to get profile")
            return
        }

        const profile = response.data

        response = await POSTS_SERVICE.create({ authorId: profile.Id, text, topic, previewText })

        if (response.status != 201) {
            // TODO: show error
            console.log("unable to create post")
            return
        }
        Router.push("/post/" + response.data)
    }

    return (
        <div className={styles["post-create-wrapper"]}>
            <TextField
                id="topic-input" label="Topic" type="text" className='margin10'
                onChange={e => setTopic(e.target.value)}
            />
            <TextField
                id="text-input" label="Text" type="text" className='margin10'
                onChange={e => setText(e.target.value)}
                multiline
                minRows={10}
            />
            <TextField
                id="text-input" label="PreviewText" type="text" className='margin10' value={previewText}
                onChange={e => setPreviewText(e.target.value)}
                multiline
                minRows={10}
            />
            <Button onClick={handleSubmit} className='margin10' variant="contained" >
                Create
            </Button>
        </div>
    )
}

export default PostCreate