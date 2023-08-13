import * as React from "react"
import ResendSignUpConfirmationForm from "../../../components/signup/signup.resend.form"
import { graphql } from "gatsby"

const ResendSignUpConfirmationPage = () => {

  return (
    <div className="flex-1 flex items-center justify-center">
      <ResendSignUpConfirmationForm />
    </div>
  )
}

export default ResendSignUpConfirmationPage

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