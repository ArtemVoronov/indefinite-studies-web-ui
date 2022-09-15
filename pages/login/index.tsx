import type { NextPage } from "next"
import * as React from "react"
import LoginForm from "../../components/login/login.form"

const LoginPage: NextPage = () => {

    return (
        <div className="bg-violet-200">
            <LoginForm />
        </div>
    )
}

export default LoginPage