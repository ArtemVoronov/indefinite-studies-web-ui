import { forwardRef } from "react"
import Link from "next/link"

const DropDownMenuLink = forwardRef((props: { href: any, children: any, locale?: any }, ref: any) => {
    const { href, children, locale, ...rest } = props
    return (
        <Link href={href} locale={locale}>
            <a ref={ref} {...rest}>
                {children}
            </a>
        </Link>
    )
})

DropDownMenuLink.displayName = 'DropDownMenuLink'

export default DropDownMenuLink