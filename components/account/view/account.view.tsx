import * as React from "react"
import { User } from "../../../services/users/users.service"
import { useTranslation } from "next-i18next"
import AccountEdit from "../edit/account.edit"
import StyledButton from "../../buttons/styled.button"

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
    <div className="overflow-hidden primary-content-block shadow sm:rounded-lg flex-1">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium leading-6">{t("account.page.settings.header")}</h3>
          <StyledButton text={t("btn.edit")} onClick={handleEditEvent} />
        </div>
        <p className="mt-1 max-w-2xl text-sm">{t("account.page.settings.subheader")}</p>
      </div>
      <div className="border-t primary-content-block">
        <dl>
          <div className="primary-content-block px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">{t("account.page.login.label")}</dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{Login}</dd>
          </div>
          <div className="primary-content-block px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">{t("account.page.email.label")}</dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{Email}</dd>
          </div>
          <div className="primary-content-block px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">{t("account.page.role.label")}</dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{Role}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default AccountView