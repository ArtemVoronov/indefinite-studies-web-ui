import './src/styles/global.css'
import React from "react"
import ProfileProvider from './src/components/context/profile.context'
import Modal from './src/components/modal/modal'
import ModalProvider from './src/components/context/modal.context'
import BasicLayout from './src/components/layout/basic.layout'
import ThemeProvider from './src/components/context/theme.context'

export const wrapPageElement = ({ element }) => {
  const newElement = React.cloneElement(
    element,  // I18nextProvider
    element.props,
    React.cloneElement(
      element.props.children,  // I18nextContext.Provider
      element.props.children.props,
      React.createElement(
        BasicLayout,
        undefined,
        element.props.children.props.children,
      ),
    ),
  )

  return (
    <ThemeProvider>
      <ModalProvider>
        <ProfileProvider>
          <Modal />
          {newElement}
        </ProfileProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}