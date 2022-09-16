import * as React from "react"
import md from "markdown-it"
import styles from "./markdown.module.css"

const MarkDown = (props: { text?: string }) => {
    return (
        <div className={styles.markdown}>
            <article className="prose lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: md().render(props.text ?? "No data") }} />
            </article>
        </div>
    )
}

export default MarkDown