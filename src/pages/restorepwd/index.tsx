import * as React from "react"
import ResendRestorePasswordForm from "../../components/restorepwd/restorepwd.resend.form"
import { graphql } from "gatsby"

const RestorePasswordPage = () => {

  return (
    <div className="flex-1 flex items-center justify-center">
      <ResendRestorePasswordForm />
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