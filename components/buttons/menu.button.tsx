import { Menu } from "@headlessui/react"
import { classNames } from "../../utils/utils"
import DropDownMenuLink from "./dropdown.menu.link"

const MenuButton = (props: { href: string, text: any, onClick?: () => void, locale?: string }) => {
    const { href, text, onClick, locale } = props
    return (
        <Menu.Item>
            {({ active }) => (
                <DropDownMenuLink href={href} locale={locale}>
                    <div
                        onClick={onClick}
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-base font-medium dark:bg-slate-400'
                        )}
                    >
                        {text}
                    </div>
                </DropDownMenuLink>
            )}
        </Menu.Item>
    )
}

export default MenuButton