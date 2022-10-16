import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostsList from "../../components/posts/list/posts.list"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: NextPage = () => {
	return (
		<PostsList />
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