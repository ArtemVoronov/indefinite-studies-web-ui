import { classNames } from "../../utils/utils"

const StyledLinkButton = (props: { text: string, onClick?: () => void, icon?: any, classes?: string }) => {
    const { text, onClick, icon, classes } = props
    return (
        <button
            onClick={onClick}
            className={classNames(
                classes ? classes : "",
                "text-indigo-600 hover:text-indigo-500 background-transparent \
                uppercase px-3 py-1 text-xs outline-none focus:outline-none ease-linear \
                transition-all duration-150"
            )}>
            {icon}
            <span>
                {text}
            </span>
        </button>
    )
}

export default StyledLinkButton