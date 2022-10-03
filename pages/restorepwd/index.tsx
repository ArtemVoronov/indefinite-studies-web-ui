import type { NextPage } from "next"
import * as React from "react"
import ResendRestorePasswordForm from "../../components/restorepwd/restorepwd.resend.form"

const RestorePasswordPage: NextPage = () => {

    return (
        <div className="flex-1 flex items-center justify-center">
            <ResendRestorePasswordForm />
        </div>
    )
}

export default RestorePasswordPage