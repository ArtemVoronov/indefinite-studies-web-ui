import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import RestorePasswordForm from "../../components/restorepwd/restorepwd.form"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"

const RestorePasswordPage: NextPage = (props: { token?: string }) => {
  const { t } = useTranslation()
  const { token } = props

  return (
    <div className="w-full max-w-3xl">
      {!token ? t("no.data") : <RestorePasswordForm token={token} />}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context?.params?.token
  const locale = context?.locale ?? "ru"
  return {
    props: {
      token,
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}

export default RestorePasswordPage