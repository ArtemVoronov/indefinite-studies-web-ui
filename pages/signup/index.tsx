import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import SignUpForm from "../../components/signup/signup.form"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const SignUpPage: NextPage = () => {

  return (
    <div className="flex-1 flex items-center justify-center">
      <SignUpForm />
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

export default SignUpPage