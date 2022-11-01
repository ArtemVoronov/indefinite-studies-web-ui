import { Menu } from "@headlessui/react"
import { LINK_COLOR_SCHEMES } from "../../utils/utils"
import DropDownMenuLink from "./dropdown.menu.link"

const MenuButton = (props: { href: string, text: any, onClick?: () => void, locale?: string }) => {
    const { href, text, onClick, locale } = props
    return (

        <Menu.Item>
            {(/*{ active }*/) => (
                <DropDownMenuLink href={href} locale={locale} text={text} onClick={onClick} colorScheme={LINK_COLOR_SCHEMES.MENU}
                    classes='block px-4 py-2 text-base font-medium'
                />
            )}
        </Menu.Item>
    )
}

export default MenuButton