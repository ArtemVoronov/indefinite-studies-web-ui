import { createContext, useState } from 'react'
import * as React from 'react';

interface Props {
    children?: React.ReactNode
    // any props that come into the component
}

type ModalContextType = {
    showModal: boolean,
    setShowModal: any,
    content: React.ReactNode
    setContent: any,
}

export const ModalContext = createContext({} as ModalContextType)

const { Provider } = ModalContext

const ModalProvider = ({ children }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState(<div />)

    return (
        <Provider value={{ showModal, setShowModal, content, setContent }}>
            {children}
        </Provider>
    )
}

export default ModalProvider