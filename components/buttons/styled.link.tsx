import Link from "next/link"
import { classNames, } from "../../utils/utils"

const StyledLink = (props: { href: string, text: string, onClick?: () => void, icon?: any, classes?: string, style?: any, locale?: any, innerRef?: any }) => {
  const { href, text, onClick, icon, classes, style, locale, innerRef } = props
  return (
    <Link href={href} locale={locale}>
      <a
        ref={innerRef}
        style={style}
        onClick={onClick}
        className={classNames(
          classes ? classes : "", "primary-link"
        )}>
        {text}
        {icon}
      </a>
    </Link >
  )
}

export default StyledLink