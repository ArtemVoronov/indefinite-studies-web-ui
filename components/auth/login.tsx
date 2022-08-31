import * as React from 'react'
import { API_CLIENT } from '../../services/api/api-client'
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import { TextField, Button } from '@mui/material'
import { AUTH_SERVICE } from '../../services/auth/auth.service'
import Router from 'next/router'

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault()
        // TODO

        AUTH_SERVICE.login(email, password).then(() => {
            console.log("success")
            Router.push("/")
        })
    }

    const ping = () => {
        API_CLIENT.auth.ping()
            .then((response) => {
                console.log(response)
            })
    }

    const safePing = () => {
        API_CLIENT.auth.safePing()
            .then((response) => {
                console.log(response)
            })

        API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.auth.safePing(),
        })

    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                id="email-input" label="Email" type="text" style={{ margin: "10px" }}
                inputProps={{ autoComplete: 'new-password', form: { autocomplete: 'off', }, }}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id="password-input" label="Password" type="password" style={{ margin: "10px" }}
                inputProps={{ autoComplete: 'new-password', form: { autocomplete: 'off', }, }}
                onChange={e => setPassword(e.target.value)}
            />
            <Button variant="contained" style={{ margin: "10px" }} onClick={handleSubmit}>Login</Button>
            <Button variant="contained" style={{ margin: "10px" }} onClick={() => { AUTH_SERVICE.logout() }}>Logout</Button>
            <Button variant="contained" style={{ margin: "10px" }} onClick={() => { ping() }}>Ping</Button>
            <Button variant="contained" style={{ margin: "10px" }} onClick={() => { safePing() }}>SafePing</Button>
        </div>
    )
}

export default LoginForm