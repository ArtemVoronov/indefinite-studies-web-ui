import type { NextPage } from "next"
import * as React from "react"
import Head from "next/head"
import styles from "../../styles/Home.module.css"
import LoginForm from "../../components/auth/login"
import NavigationPanel from "../../components/navigation/navigation.panel"

const LoginPage: NextPage = () => {

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
                    <div style={{ background: "#FFDFD3", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ background: "#D291BC", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LoginPage