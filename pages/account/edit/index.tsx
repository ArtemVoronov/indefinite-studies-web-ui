import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import AccountEdit from "../../../components/account/edit/account.edit"
import { useProfile } from '../../../components/hooks/use.profile.hook'
import Router from "next/router"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"

const AccountEditPage: NextPage = () => {
  const { t } = useTranslation()
  const [profile] = useProfile()

  return (
    <div className="w-full max-w-3xl m-3 p-3 flex-1 flex items-center justify-center">
      {!profile ? t("no.data") : <AccountEdit user={profile} onCancel={() => { Router.push("/account/") }} />}
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

export default AccountEditPage