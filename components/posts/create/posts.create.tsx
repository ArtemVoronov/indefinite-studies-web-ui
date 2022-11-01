import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE, Tag } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import AssignTagsForm from "../tags/assign.tags.form"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"

const PostCreate = () => {
    const [profile] = useProfile()
    const [showErrorModal] = useErrorModal()
    const { register, handleSubmit } = useForm()
    const { t } = useTranslation()
    const [tags, setTags] = React.useState([] as Tag[])

    const createPost = async (data: any) => {
        const { topic, text, previewText } = data

        if (!profile) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }

        const response = await POSTS_SERVICE.create({ authorUuid: profile.Uuid, text, topic, previewText, tagIds: [...tags.map(e => e.Id)] })

        if (response.status != 201) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.create.post") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
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
                            className="dark:bg-slate-400 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                            className="dark:bg-slate-400 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                            className="dark:bg-slate-400 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder={t("post.page.post.preview.text.placeholder")}
                            rows={10}
                        />
                    </div>
                </div>

                <div>
                    <AssignTagsForm onChange={(tags: Tag[]) => { setTags(tags) }} />
                </div>

                <div className="flex justify-center">
                    <StyledButton text={t("btn.submit")} />
                </div>
            </form>
        </div>
    )
}

export default PostCreate