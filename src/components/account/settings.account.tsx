import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useProfile } from '../hooks/use.profile.hook'
import AccountView from "./view/account.view"

const AccountSettingsAccountForm = () => {
  const { t } = useTranslation()
  const [profile] = useProfile()

  return (
    <div className="flex flex-1 flex-col justify-center items-center my-2">
      <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
        {t("account.page.header.account")}
      </h2>
      {!profile ? t("no.data") : <AccountView user={profile} />}
    </div>
  )
}

export default AccountSettingsAccountForm