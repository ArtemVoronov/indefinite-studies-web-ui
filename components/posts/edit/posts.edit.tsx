import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../../services/posts/posts.service"
import Router from "next/router"
import { FullPostInfo } from "../../../services/feed/feed.service"
import { useTranslation } from "next-i18next"

const PostEdit = (props: { post: FullPostInfo, onCancel: () => void }) => {
    const { register, handleSubmit } = useForm()
    const { t } = useTranslation()
    const { PostId, AuthorId } = props.post.Post

    const updatePost = async (data: any) => {
        const { topic, text, previewText } = data

        const response = await POSTS_SERVICE.update({ postId: PostId, authorId: AuthorId, text, topic, previewText })

        if (response.status == 200) {
            Router.reload()
        }
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(updatePost)}>
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
                            defaultValue={props.post.Post.PostTopic}
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
                            defaultValue={props.post.Post.PostText}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="previewText" className="block text-sm font-medium text-gray-700">
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
                            defaultValue={props.post.Post.PostPreviewText}
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

            <div className="flex justify-center">
                <button
                    type="submit"
                    onClick={props.onCancel}
                    className="group relative w-52 mt-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {t("btn.cancel")}
                </button>
            </div>
        </div>
    )
}

export default PostEdit