import type { GetServerSidePropsContext, NextPage } from "next"
import Link from "next/link"
import * as React from "react"
import Overlay from "../../components/overlay/overlay"
import { USERS_SERVICE } from "../../services/users/users.service"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../utils/utils"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const SignUpConfirmationPage: NextPage = (props: { token?: string }) => {
    const { token } = props
    const [isLoading, setIsLoading] = React.useState(false)
    const [isConfirmed, setIsConfirmed] = React.useState(false)

    const fetchConfirmRegistration = async () => {
        if (!token) {
            return
        }
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await USERS_SERVICE.confirmRegistration({ token: token })
            clearTimeout(timer)
            if (response.status === 200) {
                setIsConfirmed(true)
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchConfirmRegistration()
    }, [])

    if (isLoading) return (
        <div>
            <Overlay />
        </div>
    )

    if (isConfirmed) return (
        <div className="w-full max-w-3xl">
            <div className="flex flex-1 justify-center items-center flex-col h-screen">
                <p>Email was confirmed!</p>
                <Link href="/login">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </Link>
            </div>
        </div>
    )

    return (
        <div className="w-full max-w-3xl">
            <div className="flex flex-1 justify-center items-center flex-col h-screen">
                <p>Error occured</p>
                <Link href="/signup/resend">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Resend confirmation
                    </a>
                </Link>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context?.params?.token
    const locale = context?.locale ?? "ru"
    return {
        props: {
            token,
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}

export default SignUpConfirmationPage