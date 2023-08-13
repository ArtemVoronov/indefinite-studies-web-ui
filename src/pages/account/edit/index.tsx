import * as React from "react"
import AccountEdit from "../../../components/account/edit/account.edit"
import { useProfile } from '../../../components/hooks/use.profile.hook'
import { navigate } from "gatsby"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

const AccountEditPage = () => {
  const { t } = useTranslation()
  const [profile] = useProfile()

  return (
    <div className="w-full max-w-3xl m-3 p-3 flex-1 flex items-center justify-center">
      {!profile ? t("no.data") : <AccountEdit user={profile} onCancel={() => { navigate("/account/") }} />}
    </div>
  )
}

export default AccountEditPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export { Head } from "../../../components/layout/basic.layout"