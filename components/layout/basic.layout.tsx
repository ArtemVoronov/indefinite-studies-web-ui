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

            <main className="flex min-h-screen flex-col py-0 bg-gray-200">
                <div className="flex justify-center items-center bg-white border-b-2 border-gray-100 pt-1 pb-1">
                    <NavigationPanel />
                </div>
                <div className="flex-1 flex flex-col items-center">
                    {props.children}
                </div>
            </main>
        </div>
    )
}

export default BasicLayout


