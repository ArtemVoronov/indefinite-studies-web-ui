import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import React, { useContext } from 'react'
import StyledButton from '../buttons/styled.button'
import { ModalContext } from '../context/modal.context'

export const useErrorModal = () => {
    const { t } = useTranslation()
    const { setShowModal, setContent } = useContext(ModalContext)

    const renderContent = (title: string, text: string) => (
        <>
            <div className="bg-white dark:bg-slate-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-gray-300 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-900" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-900">
                            {title}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:text-gray-900">
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-400 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <StyledButton text={t("btn.close")} onClick={() => setShowModal(false)} />
            </div>
        </>
    )

    const showErrorModal = (show: boolean, title: string, text: string) => {
        setShowModal(show)
        setContent(renderContent(title, text))
    }

    return [showErrorModal]
}