import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import ResendRestorePasswordForm from "../../components/restorepwd/restorepwd.resend.form"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const RestorePasswordPage: NextPage = () => {

    return (
        <div className="flex-1 flex items-center justify-center">
            <ResendRestorePasswordForm />
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const locale = context?.locale ?? "ru"
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export default RestorePasswordPage