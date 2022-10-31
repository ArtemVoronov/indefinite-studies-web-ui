import { classNames } from "../../utils/utils"

const SidebarButton = (props: { href: string, text: string, onClick?: () => void, active: boolean, icon?: any }) => {
    const { href, text, onClick, active, icon } = props
    return (
        <a href={href} onClick={onClick}
            className={classNames(
                active ? "bg-indigo-100 dark:bg-slate-600" : "",
                "flex items-center mb-2 p-2 text-base font-normal text-gray-900 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
            )}>
            <span className="h-5 w-5">
                {icon}
            </span>

            <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
        </a>
    )
}

export default SidebarButton