import * as React from "react"
import { useTranslation } from "next-i18next"
import TagsList from "../tags/tags.list"
import TagCreateForm from "../tags/tags.create"
import TagEditForm from "../tags/tags.edit"
import { ArrowPathRoundedSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import { FEED_SERVICE } from "../../services/feed/feed.service"

const AdminSettingsForm = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-1 justify-between flex-col min-h-full">
            <div className="flex flex-1 flex-col justify-center0 my-2">
                <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                    {t("admin.page.header.tags")}
                </h2>
                <div className="">
                    <div className="my-2">
                        <h3 className="font-bold leading-tight text-2xl my-2">
                            {t("admin.page.header.tags.list")}
                        </h3>
                        <TagsList />
                    </div>
                    <div className="my-2">
                        <h3 className="font-bold leading-tight text-2xl my-2">
                            {t("admin.page.header.tags.create")}
                        </h3>
                        <TagCreateForm />
                    </div>
                    <div className="my-2">
                        <h3 className="font-bold leading-tight text-2xl my-2">
                            {t("admin.page.header.tags.edit")}
                        </h3>
                        <TagEditForm />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center my-2">
                <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                    {t("admin.page.header.feed")}
                </h2>
                <div className="">
                    <div className="my-2 flex">
                        <button
                            onClick={() => { FEED_SERVICE.sync() }}
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 mx-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <ArrowPathRoundedSquareIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            {t("admin.page.feed.sync.btn")}
                        </button>
                        <button
                            onClick={() => { FEED_SERVICE.clear() }}
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <TrashIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            {t("admin.page.feed.clear.btn")}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center my-2">
                <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                    {t("admin.page.header.posts")}
                </h2>
                <div className="">
                    <div>
                        TODO: list of articles awaiting moderation
                    </div>
                    <div>
                        TODO: list of comments awaiting moderation
                    </div>
                    <div>
                        TODO: assign and remove tags for post form
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center my-2">
                <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                    {t("admin.page.header.users")}
                </h2>
                <div className="">
                    <div>
                        TODO: block and unblock users, change states if needs
                    </div>
                    <div>
                        TODO: add karma to users (after some sum of karma no need to modearte of comments, posts, etc)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSettingsForm