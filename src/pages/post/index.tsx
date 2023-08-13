import * as React from "react"
import PostCreate from "../../components/posts/create/posts.create"
import { graphql } from "gatsby"

const CreatePostPage = () => {

  return (
    <div className="w-full max-w-3xl">
      <PostCreate />
    </div>
  )
}

export default CreatePostPage

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