
import * as React from "react"
import LoginForm from "../../components/login/login.form"
import { graphql } from "gatsby"

const LoginPage = () => {

  return (
    <div className="flex-1 flex items-center justify-center">
      <LoginForm />
    </div>
  )
}

export default LoginPage

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