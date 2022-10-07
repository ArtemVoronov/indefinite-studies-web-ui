import * as React from "react"
import md from "markdown-it"
import styles from "./markdown.module.css"
import { useTranslation } from "next-i18next"

const MarkDown = (props: { text?: string }) => {
    const { t } = useTranslation()
    return (
        <div className={styles.markdown}>
            <article className="prose lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: md().render(props.text ?? t("no.data")) }} />
            </article>
        </div>
    )
}

export default MarkDown