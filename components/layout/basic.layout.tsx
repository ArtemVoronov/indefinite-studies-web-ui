import * as React from 'react'
import Head from "next/head"
import styles from "./basic.layout.module.css"
import NavigationPanel from "../navigation/navigation.panel"

interface BasicLayoutProps {
    children: React.ReactNode
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    return (
        <div>
            <Head>
                <title>Indefinite Studies</title>
                <meta name="description" content="indefinite studies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.header}>
                    <NavigationPanel />
                </div>
                <div className={styles.content}>
                    <main>{props.children}</main>
                </div>
            </main>
        </div>
    )
}

export default BasicLayout


