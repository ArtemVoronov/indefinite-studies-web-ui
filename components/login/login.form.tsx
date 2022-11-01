import * as React from "react"
import { useForm } from "react-hook-form"
import { AUTH_SERVICE } from "../../services/auth/auth.service"
import { USERS_SERVICE } from "../../services/users/users.service"
import Router from "next/router"
import Image from 'next/image'
import faviconPic from '../../public/favicon.ico'
import { ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { useProfile } from '../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledLink from "../buttons/styled.link"

const LoginForm = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const [showErrorModal] = useErrorModal()
    const { t } = useTranslation()
    const [, setProfile] = useProfile()

    const login = (data: any) => {
        const { email, password } = data
        AUTH_SERVICE.login(email, password).then(() => {
            USERS_SERVICE.getMe().then((res) => {
                if (!res) {
                    setError("wrongCreds", { type: "focus", message: t("sign.in.page.error.wrong.credentials") }, { shouldFocus: true });
                    return
                }
                setProfile(res)
                Router.push("/posts/0")
            })
        }).catch(() => {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.sign.in") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
        })
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center">
                    <Image src={faviconPic} alt="Indefinite Studies" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {t("sign.in.page.header")}
                    </h2>
                </div>
                <form className="mt-8 space-y-6"
                    onSubmit={(e) => {
                        clearErrors()
                        handleSubmit(login)(e)
                    }}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                {t("sign.in.page.email.label")}
                            </label>
                            <input
                                id="email-address"
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                                required
                                className="dark:bg-slate-400 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("sign.in.page.email.placeholder")}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t("sign.in.page.password.label")}
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                {...register("password")}
                                className="dark:bg-slate-400 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("sign.in.page.password.placeholder")}
                            />
                        </div>
                        {errors.wrongCreds && (
                            <div className="my-1 py-2 px-2 rounded-md bg-red-200 text-red-800 text-sm flex justify-center items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="ml-2">{`${errors.wrongCreds.message}`}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <StyledLink href="/restorepwd" text={t("sign.in.page.forgot.password.link")} />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <StyledButton text={t("btn.sign.in")} classes="w-52"
                            icon={
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                            }
                        />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default LoginForm