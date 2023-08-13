import { classNames } from "../../utils/utils"
import StyledLinkButton from "./styled.link.button"
import React from "react"

const SidebarButton = (props: { href: string, text: string, onClick?: () => void, active: boolean, icon?: any }) => {
  const { href, text, onClick, active, icon } = props
  return (
    <StyledLinkButton
      icon={
        <span className="h-5 w-5">
          {icon}
        </span>
      }
      text={
        <span className="flex-1 ml-3 whitespace-nowrap">
          {text}
        </span>
      }
      href={href}
      onClick={onClick}
      classes={
        classNames(
          active ? "sidebar-active-button" : "",
          "flex items-center mb-2 p-2 text-base font-normal rounded-lg sidebar-button"
        )
      }
    />
  )
}

export default SidebarButton