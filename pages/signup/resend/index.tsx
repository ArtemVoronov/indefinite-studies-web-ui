import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import ResendSignUpConfirmationForm from "../../../components/signup/signup.resend.form"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ResendSignUpConfirmationPage: NextPage = () => {

    return (
        <div className="flex-1 flex items-center justify-center">
            <ResendSignUpConfirmationForm />
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

export default ResendSignUpConfirmationPage