import * as React from "react"
import PostEdit from "../../../components/posts/edit/posts.edit"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

const EditPostPage = (props: { id?: string }) => {
  const { t } = useTranslation()
  const { id } = props

  return (
    <div className="w-full max-w-3xl">
      {!id ? t("no.data") : <PostEdit postUuid={id} />}
    </div>
  )
}

export default EditPostPage

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