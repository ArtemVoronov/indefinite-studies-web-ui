import * as React from "react"
import { useProfile } from '../../components/hooks/use.profile.hook'
import AdminSettingsForm from "../../components/admin/settings.form"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

const AdminPage = () => {
  const { t } = useTranslation()
  const [profile] = useProfile()

  return (
    <div className="w-full flex flex-1">
      {!profile ? t("no.data") : <AdminSettingsForm />}
    </div>
  )
}

export default AdminPage

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