import * as React from "react"
import { useTranslation } from "next-i18next"
import { ArrowPathRoundedSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import { FEED_SERVICE } from "../../services/feed/feed.service"

const AdminSettingsFeedForm = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-1 flex-col justify-center items-center my-2">
            <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                {t("admin.page.header.feed")}
            </h2>
            <div className="">
                <div className="my-2 flex">
                    <button
                        onClick={() => { FEED_SERVICE.sync() }}
                        type="submit"
                        className="group relative flex w-48 justify-center rounded-md border border-transparent bg-indigo-600 py-2 mx-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <ArrowPathRoundedSquareIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        {t("admin.page.feed.sync.btn")}
                    </button>
                    <button
                        onClick={() => { FEED_SERVICE.clear() }}
                        type="submit"
                        className="group relative flex w-48 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <TrashIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        {t("admin.page.feed.clear.btn")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSettingsFeedForm