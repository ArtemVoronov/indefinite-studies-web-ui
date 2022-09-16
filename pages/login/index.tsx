import type { NextPage } from "next"
import * as React from "react"
import LoginForm from "../../components/login/login.form"

const LoginPage: NextPage = () => {

    return (
        <div className="flex-1 flex items-center justify-center">
            <LoginForm />
        </div>
    )
}

export default LoginPage