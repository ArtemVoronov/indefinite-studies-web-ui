import * as React from "react"
import { User } from "../../../services/users/users.service"
import Router from "next/router"
import { useTranslation } from "next-i18next"

const AccountView = (props: { user: User }) => {
    const { t } = useTranslation()

    const { Login, Email, Role } = props.user

    const handleEditEvent = () => {
        Router.push("/account/edit/")
    }

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg flex-1">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Account settings</h3>
                    <button
                        className="text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={handleEditEvent}
                    >
                        Edit
                    </button>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Login</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Login}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Role</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Role}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default AccountView