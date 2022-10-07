import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import PostView from "../../components/posts/view/posts.view"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ViewPostPage: NextPage = (props: { id?: number }) => {
    const { id } = props

    return (
        <div className="w-full max-w-3xl">
            {!id ? "No data" : <PostView postId={id} />}
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