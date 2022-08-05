import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import * as React from 'react'
import { API_CLIENT } from '../../services/api/api-client'
import { API_ERROR_HANDLER, REFRESH_TOKEN_KEY } from '../../services/api/api-error-handler'
import { FormControl, InputLabel, Input, TextField, Button } from '@mui/material';
import { margin } from '@mui/system';
import { AUTH_SERVICE } from '../../services/auth/auth-service';
import { ApiResponse } from 'apisauce';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault()
        // TODO

        AUTH_SERVICE.login(email, password)
    }

    const ping = () => {
        API_CLIENT.ping.ping()
            .then((response) => {
                console.log(response)
            })
    }

    const safePing = () => {
        API_CLIENT.ping.safePing()
            .then((response) => {
                console.log(response)
            })

        API_ERROR_HANDLER.callWithErrorHandling({
            action: () => API_CLIENT.ping.safePing(),
        })

    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                id="email-input" label="Email" type="text" style={{ margin: "10px" }}
                inputProps={{ autocomplete: 'new-password', form: { autocomplete: 'off', }, }}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id="password-input" label="Password" type="password" style={{ margin: "10px" }}
                inputProps={{ autocomplete: 'new-password', form: { autocomplete: 'off', }, }}
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


