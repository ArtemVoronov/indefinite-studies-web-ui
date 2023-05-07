import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostsList from "../../components/posts/list/posts.list"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { POST_STATES } from "../../services/posts/posts.service"

const PostsPage: NextPage = (props: { tagId?: string, page?: string }) => {
  return (
    <PostsList tagId={`${props.tagId}`} page={`${props.page}`} userUuid="" postState={POST_STATES.PUBLISHED} />
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context?.locale ?? "ru"
  const postsPathParams = context?.params?.postsPathParams
  let page = "0"
  let tagId = ""
  if (typeof (postsPathParams) != 'undefined') {
    if (postsPathParams?.length == 1) {
      page = postsPathParams[0]
    } else if (postsPathParams?.length == 2) {
      page = postsPathParams[1]
      tagId = postsPathParams[0]
    } else {
      console.log("UNSUPPORTED CASE FOR POSTS_PAGE:", postsPathParams)
    }
  }
  return {
    props: {
      tagId,
      page,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default PostsPage