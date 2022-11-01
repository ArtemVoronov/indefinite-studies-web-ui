import { classNames } from "../../utils/utils"
import StyledLinkButton from "./styled.link.button"

const SidebarButton = (props: { href: string, text: string, onClick?: () => void, active: boolean, icon?: any }) => {
    const { href, text, onClick, active, icon } = props
    return (
        <StyledLinkButton
            icon={
                <span className="h-5 w-5">
                    {icon}
                </span>
            }
            text={
                <span className="flex-1 ml-3 whitespace-nowrap">
                    {text}
                </span>
            }
            href={href}
            onClick={onClick}
            classes={
                classNames(
                    active ? "bg-indigo-100 dark:bg-slate-600" : "",
                    "flex items-center mb-2 p-2 text-base font-normal text-gray-900 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
                )
            }
        />
    )
}

export default SidebarButton