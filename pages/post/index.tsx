import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostCreate from "../../components/posts/create/posts.create"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CreatePostPage: NextPage = () => {

  return (
    <div className="w-full max-w-3xl">
      <PostCreate />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context?.locale ?? "ru"
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default CreatePostPage