import { Link } from "gatsby"
import { classNames, } from "../../utils/utils"
import React from "react"

const StyledLink = (props: { href: string, text: string, onClick?: () => void, icon?: any, classes?: string, style?: any, innerRef?: any }) => {
  const { href, text, onClick, icon, classes, style, innerRef } = props
  return (
    <Link
      ref={innerRef}
      style={style}
      onClick={onClick}
      to={href}
      className={classNames(
        classes ? classes : "", "primary-link"
      )}
    >
      {text}
      {icon}
    </Link>
  )
}

export default StyledLink