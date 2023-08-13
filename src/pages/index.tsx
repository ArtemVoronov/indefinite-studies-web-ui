import * as React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-1 justify-center items-center">
      {t("home.page.welcome")}
    </div>
  )
}

export default HomePage

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

export { Head } from "../components/layout/basic.layout"