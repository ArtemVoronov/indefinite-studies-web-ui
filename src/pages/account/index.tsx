import * as React from "react"
import { useProfile } from '../../components/hooks/use.profile.hook'
import AccountSettingsForm from "../../components/account/settings.form"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

const AccountViewPage = () => {
  const { t } = useTranslation()
  const [profile] = useProfile()

  return (
    <div className="w-full flex flex-1">
      {!profile ? t("no.data") : <AccountSettingsForm />}
    </div>
  )
}

export default AccountViewPage

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

export { Head } from "../../components/layout/basic.layout"