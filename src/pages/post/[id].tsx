import * as React from "react"
import PostView from "../../components/posts/view/posts.view"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

const ViewPostPage = (props: { id?: string }) => {
  const { t } = useTranslation()
  const { id } = props

  return (
    <div className="w-full max-w-3xl">
      {!id ? t("no.data") : <PostView postUuid={id} />}
    </div>
  )
}

export default ViewPostPage

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