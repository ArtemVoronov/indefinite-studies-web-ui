import type { NextPage } from "next"
import * as React from "react"
import LoginForm from "../../components/login/login.form"

const LoginPage: NextPage = () => {

    return (
        <div style={{ background: "#957DAD" }}>
            <LoginForm />
        </div>
    )
}

export default LoginPage