import { Menu } from "@headlessui/react"
import DropDownMenuLink from "./dropdown.menu.link"
import React from "react"

const MenuButton = (props: { href: string, text: any, onClick?: () => void }) => {
  const { href, text, onClick } = props
  return (

    <Menu.Item>
      {(/*{ active }*/) => (
        <DropDownMenuLink href={href} text={text} onClick={onClick}
          classes='block px-4 py-2 text-base font-medium'
        />
      )}
    </Menu.Item>
  )
}

export default MenuButton