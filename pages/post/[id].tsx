import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostView from "../../components/posts/view/posts.view"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"

const ViewPostPage: NextPage = (props: { id?: string }) => {
  const { t } = useTranslation()
  const { id } = props

  return (
    <div className="w-full max-w-3xl">
      {!id ? t("no.data") : <PostView postUuid={id} />}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context?.params?.id
  const locale = context?.locale ?? "ru"
  return {
    props: {
      id,
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}

export default ViewPostPage