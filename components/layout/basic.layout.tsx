import * as React from "react"
import Head from "next/head"
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

            <main className="flex min-h-screen flex-col py-0">
                <div className="bg-pink-100 flex justify-center">
                    <NavigationPanel />
                </div>
                <div className="bg-orange-100 flex-1 flex justify-center">
                    <main>{props.children}</main>
                </div>
            </main>
        </div>
    )
}

export default BasicLayout


