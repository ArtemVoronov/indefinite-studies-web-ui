import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BasicLayout from '../components/layout/basic.layout'
import ProfileProvider from '../components/context/profile.context'

function App({ Component, pageProps }: AppProps) {

  return (
    <ProfileProvider>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </ProfileProvider>
  )
}

export default App
