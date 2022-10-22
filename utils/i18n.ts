
import moment from "moment"
import "moment/locale/ru"

export const formatDate = (date: number, lang: string) => {
    const m = moment(date)
    m.locale(lang)
    return lang == "ru" ? m.format("DD.MM.YYYY, hh:mm") : m.format("YYYY-MM-DD, hh:mm")
}