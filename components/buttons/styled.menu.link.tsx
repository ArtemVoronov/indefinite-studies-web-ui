import Link from "next/link"
import { classNames } from "../../utils/utils"

const StyledMenuLink = (props: { href: string, text: string, onClick?: () => void, icon?: any, classes?: string, style?: any, locale?: any, innerRef?: any }) => {
    const { href, text, onClick, icon, classes, style, locale, innerRef } = props
    return (
        <Link href={href} locale={locale}>
            <a
                ref={innerRef}
                style={style}
                onClick={onClick}
                className={classNames(
                    classes ? classes : "", "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
                )}>
                {text}
                {icon}
            </a>
        </Link >
    )
}

export default StyledMenuLink