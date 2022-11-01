import { forwardRef } from "react"
import StyledLink from "./styled.link"

const DropDownMenuLink = forwardRef((props: { href: any, locale?: any, text: string, onClick?: () => void, classes?: string, style?: any, colorScheme?: string }, ref: any) => {
    const { href, locale, text, onClick, classes, style, colorScheme } = props
    return (
        <StyledLink href={href} locale={locale} text={text} ref={ref} onClick={onClick} classes={classes} style={style} colorScheme={colorScheme} />
    )
})

DropDownMenuLink.displayName = 'DropDownMenuLink2'

export default DropDownMenuLink