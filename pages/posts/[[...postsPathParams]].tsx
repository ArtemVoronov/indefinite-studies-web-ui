import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostsList from "../../components/posts/list/posts.list"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PostsPage: NextPage = (props: { tag?: string, page?: string }) => {
	return (
		<PostsList tag={`${props.tag}`} page={`${props.page}`} />
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const locale = context?.locale ?? "ru"
	const postsPathParams = context?.params?.postsPathParams
	let page = "0"
	let tag = ""
	if (typeof (postsPathParams) != 'undefined') {
		if (postsPathParams?.length == 1) {
			page = postsPathParams[0]
		} else if (postsPathParams?.length == 2) {
			page = postsPathParams[1]
			tag = postsPathParams[0]
		} else {
			console.log("UNSUPPORTED CASE FOR POSTS_PAGE:", postsPathParams)
		}
	}
	return {
		props: {
			tag,
			page,
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}

export default PostsPage