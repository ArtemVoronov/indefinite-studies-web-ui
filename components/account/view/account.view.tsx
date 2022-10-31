import * as React from "react"
import { User } from "../../../services/users/users.service"
import { useTranslation } from "next-i18next"
import AccountEdit from "../edit/account.edit"

const AccountView = (props: { user: User }) => {
    const { t } = useTranslation()
    const [showEditAccountForm, setShowEditAccountForm] = React.useState(false)

    const { Login, Email, Role } = props.user

    const handleEditEvent = () => {
        setShowEditAccountForm(true)
    }

    if (showEditAccountForm) return (
        <AccountEdit user={props.user} onCancel={() => { setShowEditAccountForm(false) }} />
    )

    return (
        <div className="overflow-hidden bg-white dark:bg-slate-400 shadow sm:rounded-lg flex-1">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{t("account.page.settings.header")}</h3>
                    <button
                        className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={handleEditEvent}
                    >
                        {t("btn.edit")}
                    </button>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{t("account.page.settings.subheader")}</p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800">
                <dl>
                    <div className="bg-gray-50 dark:bg-slate-400 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{t("account.page.login.label")}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Login}</dd>
                    </div>
                    <div className="bg-white dark:bg-slate-400 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{t("account.page.email.label")}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Email}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-400 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{t("account.page.role.label")}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Role}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default AccountView