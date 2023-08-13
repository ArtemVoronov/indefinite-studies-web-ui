import { forwardRef } from "react"
import StyledMenuLink from "./styled.menu.link"
import React from "react"

const DropDownMenuLink = forwardRef((props: { href: any, text: string, onClick?: () => void, classes?: string, style?: any }, ref: any) => {
  const { href, text, onClick, classes, style } = props
  return (
    <StyledMenuLink href={href} text={text} innerRef={ref} onClick={onClick} classes={classes} style={style} />
  )
})

DropDownMenuLink.displayName = 'DropDownMenuLink'

export default DropDownMenuLink