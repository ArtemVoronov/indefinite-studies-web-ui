import * as React from "react"
import PostsList from "../../components/posts/list/posts.list"
import { POST_STATES } from "../../services/posts/posts.service"
import { graphql } from "gatsby"

const PostsPage = (req: { params: any }) => {
  console.log("req:", req)


  const renderPosts = () => {
    const params = req.params[`*`].split(`/`)
    let page = "0"
    let tagId = ""

    if (params?.length == 1) {
      page = params[0]
    } else if (params?.length == 2) {
      page = params[1]
      tagId = params[0]
    }

    return <PostsList tagId={`${tagId}`} page={`${page}`} userUuid="" postState={POST_STATES.PUBLISHED} />
  }

  return (
    renderPosts()
  )
}

export default PostsPage

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