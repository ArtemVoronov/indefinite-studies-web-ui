import { Link } from "gatsby"
import { classNames } from "../../utils/utils"
import React from "react"

const StyledMenuLink = (props: { href: string, text: string, onClick?: () => void, icon?: any, classes?: string, style?: any, innerRef?: any }) => {
  const { href, text, onClick, icon, classes, style, innerRef } = props

  return (
    <Link
      ref={innerRef}
      style={style}
      onClick={onClick}
      to={href}
      className={classNames(
        classes ? classes : "", "menu-link"
      )}
    >
      {icon}
      {text}
    </Link>
  )
}

export default StyledMenuLink