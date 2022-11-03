import { forwardRef } from "react"
import StyledMenuLink from "./styled.menu.link"

const DropDownMenuLink = forwardRef((props: { href: any, locale?: any, text: string, onClick?: () => void, classes?: string, style?: any }, ref: any) => {
    const { href, locale, text, onClick, classes, style } = props
    return (
        <StyledMenuLink href={href} locale={locale} text={text} innerRef={ref} onClick={onClick} classes={classes} style={style} />
    )
})

DropDownMenuLink.displayName = 'DropDownMenuLink'

export default DropDownMenuLink