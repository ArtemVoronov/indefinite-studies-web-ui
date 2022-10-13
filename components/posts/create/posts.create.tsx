import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"

const PostCreate = () => {
    const [profile] = useProfile()
    const { register, handleSubmit } = useForm()
    const { t } = useTranslation()

    const createPost = async (data: any) => {
        const { topic, text, previewText } = data

        if (!profile) {
            // TODO: show error
            console.log("unable to get profile")
            return
        }

        const response = await POSTS_SERVICE.create({ authorUuid: profile.Uuid, text, topic, previewText, tagId: 1 }) // TODO add chosing of tags

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