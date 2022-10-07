import * as React from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { classNames } from "../../utils/utils"
import { UserIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import DropDownMenuLink from "./dropdown.menu.link"

const NotAuthorizedUserButton = () => {
    const { t } = useTranslation()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex w-full justify-center text-sm font-medium shadow-sm text-gray-500 hover:text-gray-900 ml-5">
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
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <DropDownMenuLink href="/login">
                                    <a
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-base font-medium'
                                        )}
                                    >
                                        {t("navbar.menu.sign.int")}
                                    </a>
                                </DropDownMenuLink>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <DropDownMenuLink href="/signup">
                                    <a
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-base font-medium'
                                        )}
                                    >
                                        {t("navbar.menu.sign.out")}
                                    </a>
                                </DropDownMenuLink>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <DropDownMenuLink href="/" locale="ru">
                                    <a
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-base font-medium'
                                        )}
                                    >
                                        {t("navbar.menu.to.russian")}
                                    </a>
                                </DropDownMenuLink>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <DropDownMenuLink href="/" locale="en">
                                    <a
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-base font-medium'
                                        )}
                                    >
                                        {t("navbar.menu.to.english")}
                                    </a>
                                </DropDownMenuLink>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    )
}

export default NotAuthorizedUserButton


