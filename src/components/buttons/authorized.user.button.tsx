import * as React from "react"
import { AUTH_SERVICE } from "../../services/auth/auth.service"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { User } from "../../services/users/users.service"
import { UserIcon } from '@heroicons/react/24/solid'
import { navigate } from 'gatsby'
import MenuButton from "./menu.button"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useProfile } from "../hooks/use.profile.hook"

const AuthorizedUserButton = (props: { user: User }) => {
  const { t } = useTranslation()
  const [, setProfile] = useProfile()

  const { Login } = props.user

  const logout = () => {
    navigate("/login")
    AUTH_SERVICE.logout()
    setProfile(undefined)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex w-full justify-center text-base font-medium menu-link ml-5">
          <span>{Login}</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md primary-dropdown">
          <div className="py-1">
            <MenuButton href="/account" text={t("navbar.menu.account")} />
            <MenuButton href="/admin" text={t("navbar.menu.admin.settings")} />
            <MenuButton href="/posts/0" text={t("navbar.menu.sign.out")} onClick={logout} />
            {/* <MenuButton href="/posts/0" text={t("navbar.menu.to.russian")} locale="ru" /> */}
            {/* <MenuButton href="/posts/0" text={t("navbar.menu.to.english")} locale="en" /> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

  )
}

export default AuthorizedUserButton


