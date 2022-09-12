import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import Head from "next/head"
import styles from "../../styles/Home.module.css"
import NavigationPanel from "../../components/navigation/navigation.panel"
import PostView from "../../components/posts/posts.view"
import { FEED_SERVICE, FullPostInfo } from "../../services/feed/feed.service"
import { isNil } from "../../utils/utils"

const ViewOrEditPostPage: NextPage = (props: { post?: FullPostInfo }) => {
    const { post } = props

    return (
        <div>
            <Head>
                <title>Indefinite Studies</title>
                <meta name="description" content="indefinite studies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div style={{ background: "#FEC8D8", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    header
                </div>
                <div style={{ background: "#E0BBE4", minHeight: "64px", flex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <NavigationPanel />
                </div>
                <div style={{ background: "#FFDFD3", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PostView post={post} />
                </div>
            </main >
        </div >
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id
    if (isNil(id)) {
        return { props: {} }
    }
    const response = await FEED_SERVICE.get({ postId: `${id}` })

    if (response.status === 200) {
        const post = response.data
        return { props: { post } }
    }

    return { props: {} }
}

export default ViewOrEditPostPage