import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"

const TagCreateForm = () => {
    const [profile] = useProfile()
    const [showErrorModal] = useErrorModal()
    const { register, handleSubmit } = useForm()
    const { t } = useTranslation()

    const createTag = async (data: any) => {
        const { name } = data

        if (!profile) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }

        const response = await POSTS_SERVICE.createTag({ name })

        if (response.status != 201) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.create.tag") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }
        Router.reload()
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(createTag)}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {t("admin.page.tag.name.label")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            id="name"
                            required
                            type="text"
                            {...register("name")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder={t("admin.page.tag.name.placeholder")}
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

export default TagCreateForm