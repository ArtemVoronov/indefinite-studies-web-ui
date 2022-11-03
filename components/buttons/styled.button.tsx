import { classNames } from "../../utils/utils"

const StyledButton = (props: { text: string, onClick?: () => void, icon?: any, classes?: string }) => {
    const { text, onClick, icon, classes } = props
    return (
        <button
            onClick={onClick}
            className={classNames(
                classes ? classes : "",
                "bg-indigo-600 text-white dark:text-gray-300 hover:bg-indigo-700 focus:ring-indigo-500 \
                group relative m-1 rounded-md border border-transparent py-2 px-4 text-sm font-medium focus:outline-none \
                focus:ring-2 focus:ring-offset-2"
            )}
        >
            {icon}
            <span className="text-center">
                {text}
            </span>
        </button>
    )
}

export default StyledButton