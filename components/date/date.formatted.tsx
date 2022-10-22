import * as React from "react"
import { useTranslation } from "next-i18next"
import { formatDate } from "../../utils/i18n"

const DateFormatted = (props: { date: number }) => {
    const { i18n } = useTranslation()
    const { date } = props
    const [dateFormatted, setDateFormatted] = React.useState(formatDate(date, i18n.language))

    React.useEffect(() => {
        setDateFormatted(formatDate(date, i18n.language))
    }, [i18n])

    return (
        <div>{dateFormatted}</div>
    )
}

export default DateFormatted