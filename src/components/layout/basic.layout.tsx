import * as React from "react"
import NavigationPanel from "../navigation/navigation.panel"

interface BasicLayoutProps {
  children: React.ReactNode
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  return (
    <div>
      <main className="flex min-h-screen flex-col py-0 primary-main">
        <div className="flex justify-center items-center primary-navbar border-b-2 pt-1 pb-1">
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

export const Head = () => {
  return (
    <>
      <title>Indefinite Studies</title>
      <meta name="description" content="indefinite studies" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}