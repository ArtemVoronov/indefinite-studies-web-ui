import * as React from "react"
import Link from "next/link"
import { AUTH_SERVICE } from "../../services/auth/auth.service"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from "../../utils/utils"
import { User } from "../../services/users/users.service"
import { UserIcon } from '@heroicons/react/24/solid'
import Router from 'next/router'

const AuthorizedUserButton = (props: { user?: User }) => {

    const logout = () => {
        AUTH_SERVICE.logout()
        Router.reload()
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex w-full justify-center text-base font-medium text-gray-500 hover:text-gray-900 ml-5">
                    <span>{props.user?.Login ?? "No data"}</span>
                    <UserIcon className="h-6 w-6" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <div>
                                    <Link href="/account">
                                        <a
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-base font-medium'
                                            )}
                                        >
                                            Account settings
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div>
                                    <Link href="/">
                                        <a
                                            onClick={logout}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-base font-medium'
                                            )}
                                        >
                                            Sign out
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    )
}

export default AuthorizedUserButton


