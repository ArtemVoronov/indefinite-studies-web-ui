import * as React from "react"
import RestorePasswordForm from "../../components/restorepwd/restorepwd.form"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

const RestorePasswordPage = (props: { token?: string }) => {
  const { t } = useTranslation()
  const { token } = props

  return (
    <div className="w-full max-w-3xl">
      {!token ? t("no.data") : <RestorePasswordForm token={token} />}
    </div>
  )
}

export default RestorePasswordPage

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