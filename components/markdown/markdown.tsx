import * as React from "react"
import md from "markdown-it"
import styles from "./markdown.module.css"

const MarkDown = (props: { text?: string }) => {
    return (
        <div className={styles.markdown}>
            <div dangerouslySetInnerHTML={{ __html: md().render(props.text ?? "No data") }} />
        </div>
    )
}

export default MarkDown