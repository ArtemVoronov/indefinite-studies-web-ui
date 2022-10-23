import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BasicLayout from '../components/layout/basic.layout'
import ProfileProvider from '../components/context/profile.context'
import { appWithTranslation } from 'next-i18next';
import Modal from '../components/modal/modal'
import ModalProvider from '../components/context/modal.context'

function App({ Component, pageProps }: AppProps) {

  return (
    <ModalProvider>
      <ProfileProvider>
        <BasicLayout>
          <Modal />
          <Component {...pageProps} />
        </BasicLayout>
      </ProfileProvider>
    </ModalProvider>
  )
}

export default appWithTranslation(App)
