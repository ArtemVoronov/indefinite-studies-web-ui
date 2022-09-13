import type { NextPage } from "next"
import * as React from "react"
import LoginForm from "../../components/auth/login"

const LoginPage: NextPage = () => {

    return (
        <div style={{ background: "#FFDFD3", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#D291BC", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage