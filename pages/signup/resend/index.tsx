import type { NextPage } from "next"
import * as React from "react"
import ResendSignUpConfirmationForm from "../../../components/signup/signup.resend.form"

const ResendSignUpConfirmationPage: NextPage = () => {

    return (
        <div className="flex-1 flex items-center justify-center">
            <ResendSignUpConfirmationForm />
        </div>
    )
}

export default ResendSignUpConfirmationPage