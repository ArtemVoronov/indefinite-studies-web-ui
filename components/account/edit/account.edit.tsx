import * as React from "react"
import { useForm } from "react-hook-form"
import { User, USERS_SERVICE } from "../../../services/users/users.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"
import StyledTextInput from "../../form/styled.input"

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
                            <StyledTextInput id="login" required register={register} placeholder={t("account.page.login.placeholder")} defaultValue={Login} />
                        </div>
                    </div>
                    {/* TODO: email changing with confirmation */}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t("account.page.password.label")}
                        </label>
                        <StyledTextInput id="password" type="password" autoComplete="current-password" required register={register} placeholder={t("account.page.password.placeholder")} />
                    </div>

                    <div className="flex justify-center">
                        <StyledButton text={t("btn.submit")} />
                    </div>
                </form>
                <div className="flex justify-center">
                    <StyledButton text={t("btn.cancel")} onClick={props.onCancel} />
                </div>
            </div>
        </div>
    )
}

export default AccountEdit