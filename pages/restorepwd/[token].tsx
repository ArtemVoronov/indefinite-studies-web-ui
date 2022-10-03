import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import RestorePasswordForm from "../../components/restorepwd/restorepwd.form"

const RestorePasswordPage: NextPage = (props: { token?: string }) => {
    const { token } = props

    return (
        <div className="w-full max-w-3xl">
            {!token ? "No data" : <RestorePasswordForm token={token} />}
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context?.params?.token
    return { props: { token } }
}
export default RestorePasswordPage