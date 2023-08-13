import * as React from "react"
import { POSTS_SERVICE, Tag } from "../../services/posts/posts.service"
import Overlay from "../overlay/overlay"
import { DEFAULT_LIMIT, SPIN_ICON_SHOWING_TIMEOUT } from "../../utils/utils"
import { useTranslation } from "gatsby-plugin-react-i18next"

const TagsList = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [tags, setTags] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)
    const { t } = useTranslation()

    const fetchTags = async () => {
        if (isAllFetched) {
            return
        }
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await POSTS_SERVICE.getTags({ offset, limit: DEFAULT_LIMIT })
            clearTimeout(timer)
            if (response.status === 200) {
                const count = response.data.Count
                const portion = response.data.Data
                if (count != 0) {
                    setTags(tags.concat(portion))
                }
                if (portion.length == DEFAULT_LIMIT) {
                    setOffset(offset + DEFAULT_LIMIT)
                }
                if (portion.length < DEFAULT_LIMIT) {
                    setIsAllFetched(true)
                }
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchTags()
    }, [offset])


    if (isLoading) return (
        <div>
            <Overlay />
        </div>
    )

    if (tags.length == 0) return (
        <div>
            {t("no.data")}
        </div>
    )

    return (
        <div className="w-full max-w-3xl">
            <div className="flex">
                {tags.map(function (p: Tag, idx) {
                    return (
                        <div className="primary-button p-1 m-1" key={idx}>{p.Name}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default TagsList