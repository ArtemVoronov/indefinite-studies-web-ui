import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE, Tag } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import Overlay from "../../overlay/overlay"
import { DEFAULT_LIMIT, SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"

const PostCreate = () => {
    const [profile] = useProfile()
    const { register, handleSubmit } = useForm()
    const { t } = useTranslation()

    const [isLoading, setIsLoading] = React.useState(false)
    const [tags, setTags] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)

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

    const createPost = async (data: any) => {
        const { tagId, topic, text, previewText } = data

        if (!profile) {
            // TODO: show error
            console.log("unable to get profile")
            return
        }

        const response = await POSTS_SERVICE.create({ authorUuid: profile.Uuid, text, topic, previewText, tagId: parseInt(tagId) })

        if (response.status != 201) {
            // TODO: show error
            console.log("unable to create post")
            return
        }
        Router.push("/post/" + response.data)
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(createPost)}>
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                        {t("post.page.post.topic.label")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            id="topic"
                            required
                            type="text"
                            {...register("topic")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder={t("post.page.post.topic.placeholder")}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                        {t("post.page.post.text.label")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <textarea
                            id="text"
                            required
                            {...register("text")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder={t("post.page.post.text.placeholder")}
                            rows={30}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                        {t("post.page.post.preview.text.label")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <textarea
                            id="previewText"
                            required
                            {...register("previewText")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder={t("post.page.post.preview.text.placeholder")}
                            rows={10}
                        />
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">{t("post.page.post.tag.id.label")}</label>
                    <select id="tagId" required {...register("tagId")} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {tags.map(function (p: Tag, idx) {
                            return (
                                <option value={p.Id} key={idx}>{p.Name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="group relative w-52 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t("btn.submit")}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default PostCreate