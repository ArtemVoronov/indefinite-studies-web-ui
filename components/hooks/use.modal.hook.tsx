import { useContext } from 'react'
import { ModalContext } from '../context/modal.context'

export const useModal = () => {
    const { showModal, setShowModal, content, setContent } = useContext(ModalContext)
    return [showModal, setShowModal, content, setContent]
}