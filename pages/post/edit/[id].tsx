import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"
import PostEdit from "../../../components/posts/edit/posts.edit"

const EditPostPage: NextPage = (props: { id?: string }) => {
  const { t } = useTranslation()
  const { id } = props

  return (
    <div className="w-full max-w-3xl">
      {!id ? t("no.data") : <PostEdit postUuid={id} />}
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

export default EditPostPage