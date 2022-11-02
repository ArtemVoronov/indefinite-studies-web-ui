import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE, Tag } from "../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import { DEFAULT_LIMIT, SPIN_ICON_SHOWING_TIMEOUT } from "../../utils/utils"
import Overlay from "../overlay/overlay"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledTextInput from "../form/styled.input"

const TagEditForm = () => {
    const [profile] = useProfile()
    const [showErrorModal] = useErrorModal()
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

    const updateTag = async (data: any) => {
        console.log("update tag: ", data)
        const { id, name } = data

        if (!profile) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }

        const response = await POSTS_SERVICE.updateTag({ id: parseInt(id), name })

        if (response.status != 200) {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.tag") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
            return
        }
        Router.reload()
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(updateTag)}>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">{t("admin.page.tag.id.label")}</label>
                    <select id="id" required {...register("id")} className="dark:bg-slate-400 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {tags.map(function (p: Tag, idx) {
                            return (
                                <option value={p.Id} key={idx}>{p.Name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {t("admin.page.tag.name.label")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <StyledTextInput id="name" type="text" placeholder={t("admin.page.tag.name.placeholder")} required register={register} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <StyledButton text={t("btn.submit")} classes="w-52" />
                </div>
            </form>

        </div>
    )
}

export default TagEditForm