import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import LoginForm from "../../components/login/login.form"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const LoginPage: NextPage = () => {

  return (
    <div className="flex-1 flex items-center justify-center">
      <LoginForm />
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

export default LoginPage