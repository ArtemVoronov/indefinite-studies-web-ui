import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ACCESS_TOKEN_KEY } from "../services/auth/auth.service"
import { API_CLIENT } from "../services/api/api-client"
import BasicLayout from '../components/layout/basic.layout'
import ProfileProvider from '../components/context/profile.context'

function App({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    API_CLIENT.setJWTAuthrozationHeader(window.localStorage[ACCESS_TOKEN_KEY])
  }, [])

  return (
    <ProfileProvider>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </ProfileProvider>
  )
}

export default App
