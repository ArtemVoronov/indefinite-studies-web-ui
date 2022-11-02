import * as React from "react"
import { useForm } from "react-hook-form"
import { USERS_SERVICE } from "../../services/users/users.service"
import Image from 'next/image'
import faviconPic from '../../public/favicon.ico'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledTextInput from "../form/styled.input"

const SignUpForm = () => {
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm()
    const [showErrorModal] = useErrorModal()
    const [isEmailSent, setIsEmailSent] = React.useState(false)

    const signup = (data: any) => {
        const { login, email, password } = data
        USERS_SERVICE.register({ login, email, password }).then((res) => {
            if (!res || res.status != 200) {
                showErrorModal(true,
                    t("error.page.unexpected.error.occurred"),
                    t("error.page.unable.to.sign.up") + " " + t("error.page.please.repeat.action.or.reload.the.page")
                )
                return
            }
            setIsEmailSent(true)
        })
    }

    if (isEmailSent) {
        return (
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {t("sign.up.page.link.was.sent")}
            </div>
        )
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Image src={faviconPic} alt="Indefinite Studies" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {t("sign.up.page.header")}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(signup)}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="login" className="sr-only">
                                {t("sign.up.page.login.label")}
                            </label>
                            <StyledTextInput id="login" required register={register} placeholder={t("sign.up.page.login.placeholder")} />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                {t("sign.up.page.email.label")}
                            </label>
                            <StyledTextInput id="email-address" type="email" autoComplete="email" placeholder={t("sign.up.page.email.placeholder")} required register={register} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t("sign.up.page.password.label")}
                            </label>
                            <StyledTextInput id="password" type="password" autoComplete="current-password" placeholder={t("sign.up.page.password.placeholder")} required register={register} />
                        </div>
                    </div>

                    <div>
                        <StyledButton text={t("sign.up.page.btn.sign.up")} classes="w-52" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUpForm