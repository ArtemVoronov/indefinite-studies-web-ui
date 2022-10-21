import * as React from "react"
import { useTranslation } from "next-i18next"
const AdminSettingsPostsForm = () => {
    const { t } = useTranslation()

    return (

        <div className="flex flex-1 flex-col justify-center my-2">
            <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                {t("account.page.header.my.posts")}
            </h2>
            <div className="">
                <div>
                    TODO: add post lists by user
                </div>
            </div>
        </div>

    )
}

export default AdminSettingsPostsForm