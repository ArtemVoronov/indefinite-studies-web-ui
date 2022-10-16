import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: NextPage = () => {
	return (
		<div>TODO: home page</div>
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

export default HomePage