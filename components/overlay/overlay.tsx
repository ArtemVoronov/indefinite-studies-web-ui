import { useTranslation } from "next-i18next"
import * as React from "react"
import styles from "./overlay.module.css"

const Overlay = () => {
    const { t } = useTranslation()

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className={styles.loader + " ease-linear rounded-full border-4 border-t-4 border-white h-14 w-14 mb-4"}></div>
            <h2 className="text-center text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center ">This may take a few seconds, please dont close this page.</p>
        </div>
    )
}

export default Overlay