import { Dialog } from '@headlessui/react'
import { useTranslation } from 'next-i18next'
import React, { useContext } from 'react'
import { ModalContext } from '../context/modal.context'

export const useConfirmModal = () => {
    const { t } = useTranslation()
    const { setShowModal, setContent } = useContext(ModalContext)

    const renderContent = (title: string, text: string, onConfirm: () => void) => (
        <>
            <div className="bg-white dark:bg-slate-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {title}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-400 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                        onConfirm()
                        setShowModal(false)
                    }}
                >
                    {t("btn.confirm")}
                </button>
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                >
                    {t("btn.cancel")}
                </button>
            </div>
        </>
    )

    const showConfirmModal = (show: boolean, title: string, text: string, onConfirm: () => void) => {
        setShowModal(show)
        setContent(renderContent(title, text, onConfirm))
    }

    return [showConfirmModal]
}