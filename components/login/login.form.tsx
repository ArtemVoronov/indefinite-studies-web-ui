import * as React from 'react'
import { TextField, Button } from '@mui/material'
import { AUTH_SERVICE } from '../../services/auth/auth.service'
import { API_CLIENT } from '../../services/api/api-client'
import { API_ERROR_HANDLER } from '../../services/api/api-error-handler'
import styles from "./login.form.module.css"
import Router from 'next/router'

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = () => {
        AUTH_SERVICE.login(email, password).then(() => {
            console.log("success")
            Router.push("/")
        })
    }
    const logout = () => {
        AUTH_SERVICE.logout()
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
        <div className={styles['login-form-wrapper']}>
            <TextField
                id="email-input" label="Email" type="text" className="margin10"
                inputProps={{ autoComplete: 'new-password', form: { autocomplete: 'off', }, }}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id="password-input" label="Password" type="password" className="margin10"
                inputProps={{ autoComplete: 'new-password', form: { autocomplete: 'off', }, }}
                onChange={e => setPassword(e.target.value)}
            />
            <Button variant="contained" className="margin10" onClick={login}>
                Login
            </Button>
            <Button variant="contained" className="margin10" onClick={logout}>
                Logout
            </Button>
            {/* TODO: clean */}
            <Button variant="contained" className="margin10" onClick={() => { ping() }}>Ping</Button>
            <Button variant="contained" className="margin10" onClick={() => { safePing() }}>SafePing</Button>
        </div>
    )
}

export default LoginForm