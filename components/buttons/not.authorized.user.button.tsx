import * as React from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import MenuButton from "./menu.button"

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
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div className="py-1">
                        <MenuButton href="/login" text={t("navbar.menu.sign.in")} />
                        <MenuButton href="/signup" text={t("navbar.menu.sign.up")} />
                        <MenuButton href="/posts/0" text={t("navbar.menu.to.russian")} locale="ru" />
                        <MenuButton href="/posts/0" text={t("navbar.menu.to.english")} locale="en" />
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    )
}

export default NotAuthorizedUserButton


