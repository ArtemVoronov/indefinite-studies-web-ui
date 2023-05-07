import * as React from "react"
import md from "markdown-it"
import styles from "./markdown.module.css"
import { useTranslation } from "next-i18next"

const MarkDown = (props: { text?: string, className?: string }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.markdown}>
      <article className={!props.className ? "prose lg:prose-xl" : props.className}>
        <div dangerouslySetInnerHTML={{ __html: md().render(props.text ?? t("no.data")) }} />
      </article>
    </div>
  )
}

export default MarkDown