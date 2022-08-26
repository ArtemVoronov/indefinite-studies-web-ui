import * as React from 'react'
import { API_CLIENT } from '../../services/api/api-client'
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import { Button } from '@mui/material';

const DEFAULT_LIMIT = 25

const PostsList = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)

    async function fetchPosts() {
        if (isAllFetched) {
            return
        }
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, 500)

        try {

            const response = await API_ERROR_HANDLER.callWithErrorHandling({
                action: () => API_CLIENT.posts.getAll({ offset, limit: DEFAULT_LIMIT }),
            })
            clearTimeout(timer)
            // console.log("response:") // todo clean
            // console.log(response) // todo clean
            if (response.status === 200) {
                const portion = response.data.Data
                // console.log("portion:") // todo clean
                // console.log(portion) // todo clean
                if (portion.length < DEFAULT_LIMIT) {
                    setIsAllFetched(true)
                }
                const updatedList = posts.concat(portion)
                setPosts(updatedList)
                setOffset(offset + DEFAULT_LIMIT)
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        // TODO

        fetchPosts()
    }

    const ping = () => {
        API_CLIENT.posts.ping()
            .then((response) => {
                console.log(response)
            })
    }

    const safePing = () => {
        API_CLIENT.posts.safePing()
            .then((response) => {
                console.log(response)
            })

        API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.posts.safePing(),
        })

    }

    React.useEffect(() => {
        fetchPosts()
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (posts.length == 0) return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div>
                No data
            </div>
            <div style={{ display: "flex", flex: "1", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" style={{ margin: "10px" }} onClick={handleSubmit}>Reload</Button>
                <Button variant="contained" style={{ margin: "10px" }} onClick={() => { ping() }}>Ping</Button>
                <Button variant="contained" style={{ margin: "10px" }} onClick={() => { safePing() }}>SafePing</Button>
            </div>
        </div>
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {posts.map(function (d: { Topic: string }, idx) {
                console.log(d) // todo clean
                return (<li key={idx}>{d.Topic}</li>)
            })}

            <div style={{ display: "flex", flex: "1", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" style={{ margin: "10px" }} onClick={handleSubmit}>Reload</Button>
                <Button variant="contained" style={{ margin: "10px" }} onClick={() => { ping() }}>Ping</Button>
                <Button variant="contained" style={{ margin: "10px" }} onClick={() => { safePing() }}>SafePing</Button>
            </div>
        </div>
    )
}

export default PostsList


