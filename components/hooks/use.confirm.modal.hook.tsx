import { Dialog } from '@headlessui/react'
import { useTranslation } from 'next-i18next'
import React, { useContext } from 'react'
import StyledButton from '../buttons/styled.button'
import { ModalContext } from '../context/modal.context'

export const useConfirmModal = () => {
    const { t } = useTranslation()
    const { setShowModal, setContent } = useContext(ModalContext)

    const renderContent = (title: string, text: string, onConfirm: () => void) => (
        <>
            <div className="primary-content-block px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                            {title}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm">
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="primary-content-block px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <StyledButton text={t("btn.confirm")} onClick={() => {
                    onConfirm()
                    setShowModal(false)
                }} />
                <StyledButton text={t("btn.cancel")} onClick={() => setShowModal(false)} />
            </div>
        </>
    )

    const showConfirmModal = (show: boolean, title: string, text: string, onConfirm: () => void) => {
        setShowModal(show)
        setContent(renderContent(title, text, onConfirm))
    }

    return [showConfirmModal]
}