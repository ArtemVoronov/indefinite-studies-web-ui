import { useTranslation } from "next-i18next"
import * as React from "react"
import styles from "./overlay.module.css"

const Overlay = () => {
    const { t } = useTranslation()

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className={styles.loader + " ease-linear rounded-full border-4 border-t-4 border-white h-14 w-14 mb-4"}></div>
            <h2 className="text-center text-xl font-semibold">{t("overlay.header")}...</h2>
            <p className="w-1/3 text-center ">{t("overlay.subheader")}</p>
        </div>
    )
}

export default Overlay