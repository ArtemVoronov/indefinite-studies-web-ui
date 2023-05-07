import { Menu } from "@headlessui/react"
import DropDownMenuLink from "./dropdown.menu.link"

const MenuButton = (props: { href: string, text: any, onClick?: () => void, locale?: string }) => {
  const { href, text, onClick, locale } = props
  return (

    <Menu.Item>
      {(/*{ active }*/) => (
        <DropDownMenuLink href={href} locale={locale} text={text} onClick={onClick}
          classes='block px-4 py-2 text-base font-medium'
        />
      )}
    </Menu.Item>
  )
}

export default MenuButton