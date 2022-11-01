import * as React from "react"
import { useForm } from "react-hook-form"
import { USERS_SERVICE } from "../../services/users/users.service"
import Image from 'next/image'
import faviconPic from '../../public/favicon.ico'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"

const ResendRestorePasswordForm = () => {
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm()
    const [showErrorModal] = useErrorModal()
    const [isEmailSent, setIsEmailSent] = React.useState(false)

    const resend = (data: any) => {
        const { email } = data
        USERS_SERVICE.restorePassword({ email }).then((res) => {
            if (!res || res.status != 200) {
                showErrorModal(true,
                    t("error.page.unexpected.error.occurred"),
                    t("error.page.unable.to.send.restore.password.link") + " " + t("error.page.please.repeat.action.or.reload.the.page")
                )
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
                                className="dark:bg-slate-400 relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("restore.pwd.page.email.placeholder")}
                            />
                        </div>

                    </div>

                    <div>
                        <StyledButton text={t("restore.pwd.page.btn.send.link")} classes="w-52" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ResendRestorePasswordForm