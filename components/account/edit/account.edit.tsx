import * as React from "react"
import { useForm } from "react-hook-form"
import { User, USERS_SERVICE } from "../../../services/users/users.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../../hooks/use.error.modal.hook"

const AccountEdit = (props: { user: User, onCancel: () => void }) => {
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm()
    const [, setProfile] = useProfile()
    const [showErrorModal] = useErrorModal()

    const { Uuid, Login } = props.user

    const updateUser = async (data: any) => {
        const { login, password } = data

        const response = await USERS_SERVICE.update({ Uuid, login, password: password != "" ? password : undefined })

        if (response.status == 200) {
            USERS_SERVICE.getMe().then((res) => {
                if (!res) {
                    return
                }
                setProfile(res)
                Router.reload()
            })
        } else {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
        }
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <form className="mt-8 space-y-4" onSubmit={handleSubmit(updateUser)}>
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                            {t("account.page.login.label")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                id="login"
                                required
                                type="text"
                                {...register("login")}
                                className="dark:bg-slate-400 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("account.page.login.placeholder")}
                                defaultValue={Login}
                            />
                        </div>
                    </div>
                    {/* TODO: email changing with confirmation */}
                    {/* <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t("account.page.email.label")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                id="email"
                                required
                                {...register("email")}
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("account.page.email.placeholder")}
                                defaultValue={Email}
                            />
                        </div>
                    </div> */}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t("account.page.password.label")}
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password")}
                            className="dark:bg-slate-400 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder={t("account.page.password.placeholder")}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="group relative w-52 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {t("btn.submit")}
                        </button>

                    </div>
                </form>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={props.onCancel}
                        className="group relative w-52 mt-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t("btn.cancel")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccountEdit