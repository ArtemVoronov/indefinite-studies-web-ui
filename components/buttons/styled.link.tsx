import Link from "next/link"
import { classNames, LINK_COLOR_SCHEMES } from "../../utils/utils"

const StyledLink = (props: { href: string, text: string, onClick?: () => void, icon?: any, classes?: string, style?: any, colorScheme?: string, locale?: any, innerRef?: any }) => {
    const { href, text, onClick, icon, classes, style, colorScheme, locale, innerRef } = props
    return (
        <Link href={href} locale={locale}>
            <a
                ref={innerRef}
                style={style}
                onClick={onClick}
                className={classNames(
                    classes ? classes : "",
                    colorScheme ? colorScheme : LINK_COLOR_SCHEMES.BASE
                )}>
                {text}
                {icon}
            </a>
        </Link >

    )
}

export default StyledLink