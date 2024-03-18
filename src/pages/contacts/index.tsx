import * as React from "react"
import { useProfile } from '../../components/hooks/use.profile.hook'
import AdminSettingsForm from "../../components/admin/settings.form"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

const ContactsPage = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 justify-center items-center">
      {t("contacts.page.welcome")}
    </div>
  )
}

export default ContactsPage

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