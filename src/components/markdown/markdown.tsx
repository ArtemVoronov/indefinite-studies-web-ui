import * as React from "react"
import md from "markdown-it"
// TODO: fix styles
// import styles from "./markdown.module.css"
import { useTranslation } from "gatsby-plugin-react-i18next"

const MarkDown = (props: { text?: string, className?: string }) => {
  const { t } = useTranslation()
  return (
    // <div className={styles.markdown}>
    <div>
      <article className={!props.className ? "prose lg:prose-xl" : props.className}>
        <div dangerouslySetInnerHTML={{ __html: md().render(props.text ?? t("no.data")) }} />
      </article>
    </div>
  )
}

export default MarkDown