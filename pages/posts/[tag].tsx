import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostsList from "../../components/posts/list/posts.list"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: NextPage = (props: { tag?: string }) => {
	return (
		<PostsList tag={props.tag} />
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const locale = context?.locale ?? "ru"
	const tag = context?.params?.tag
	return {
		props: {
			tag,
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}

export default HomePage