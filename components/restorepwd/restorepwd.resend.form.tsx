import * as React from "react"
import { useForm } from "react-hook-form"
import { USERS_SERVICE } from "../../services/users/users.service"
import Image from 'next/image'
import faviconPic from '../../public/favicon.ico'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useTranslation } from "next-i18next"

const ResendRestorePasswordForm = () => {
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm()
    const [isEmailSent, setIsEmailSent] = React.useState(false)

    const resend = (data: any) => {
        const { email } = data
        USERS_SERVICE.restorePassword({ email }).then((res) => {
            console.log("res: ", res) // todo clean
            if (!res) {
                // TODO; show error
                return
            }
            if (res.status != 200) {
                // TODO; show error
                return
            }
            setIsEmailSent(true)
        })
    }

    if (isEmailSent) {
        return (
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {t("restore.pwd.page.link.was.sent")}
            </div>
        )
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Image src={faviconPic} alt="Indefinite Studies" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {t("restore.pwd.page.header")}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(resend)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                {t("restore.pwd.page.email.label")}
                            </label>
                            <input
                                id="email-address"
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                                required
                                className="relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("restore.pwd.page.email.placeholder")}
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            {t("restore.pwd.page.btn.send.link")}
                        </button>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default ResendRestorePasswordForm