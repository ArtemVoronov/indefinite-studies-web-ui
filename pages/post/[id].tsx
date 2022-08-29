import type { NextPage } from "next"
import * as React from "react"
import Head from "next/head"
import styles from "../../styles/Home.module.css"
import NavigationPanel from "../../components/navigation/navigation.panel"
import { useRouter } from 'next/router'

const ViewOrEditPostPage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

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
                    {"View post " + id}
                </div>
            </main>
        </div>
    )
}

export default ViewOrEditPostPage