import * as React from "react"
import SignUpForm from "../../components/signup/signup.form"
import { graphql } from "gatsby"

const SignUpPage = () => {

  return (
    <div className="flex-1 flex items-center justify-center">
      <SignUpForm />
    </div>
  )
}

export default SignUpPage

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