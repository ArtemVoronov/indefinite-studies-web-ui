import type { NextPage } from "next"
import * as React from "react"
import SignUpForm from "../../components/signup/signup.form"

const SignUpPage: NextPage = () => {

    return (
        <div className="flex-1 flex items-center justify-center">
            <SignUpForm />
        </div>
    )
}

export default SignUpPage