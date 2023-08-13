import { forwardRef } from "react"
import { classNames } from "../../utils/utils"
import React from "react"

const StyledLinkButton = forwardRef((props: { text?: any, onClick?: () => void, icon?: any, classes?: string, style?: any, href?: any }, ref: any) => {
  const { text, onClick, icon, classes, style, href } = props
  return (
    <a
      ref={ref}
      href={href}
      style={style}
      onClick={onClick}
      className={classNames(
        classes ? classes : "",
        "primary-link background-transparent uppercase px-3 py-1 text-xs \
                outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer"
      )
      }>
      {icon}
      <span>
        {text}
      </span >
    </a >
  )
})

StyledLinkButton.displayName = 'StyledLinkButton'

export default StyledLinkButton