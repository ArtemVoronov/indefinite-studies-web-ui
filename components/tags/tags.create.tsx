import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"

const TagCreateForm = () => {
    const [profile] = useProfile()
    const { register, handleSubmit } = useForm()
    const { t } = useTranslation()

    const createTag = async (data: any) => {
        const { name } = data

        if (!profile) {
            // TODO: show error
            console.log("unable to get profile")
            return
        }

        const response = await POSTS_SERVICE.createTag({ name })

        if (response.status != 201) {
            // TODO: show error
            console.log("unable to create tag")
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