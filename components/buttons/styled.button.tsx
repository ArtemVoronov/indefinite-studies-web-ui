import { BUTTON_COLOR_SCHEMES, classNames } from "../../utils/utils"

const StyledButton = (props: { text: string, onClick?: () => void, icon?: any, classes?: string, colorScheme?: any }) => {
    const { text, onClick, icon, classes, colorScheme } = props
    return (
        <button
            onClick={onClick}
            className={classNames(
                classes ? classes : "",
                (colorScheme ? colorScheme : BUTTON_COLOR_SCHEMES.BASE) + " \
                group relative m-1 rounded-md border border-transparent py-2 px-4 text-sm \
                font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            )}>
            {icon}
            <span className="text-center">
                {text}
            </span>
        </button>
    )
}

export default StyledButton