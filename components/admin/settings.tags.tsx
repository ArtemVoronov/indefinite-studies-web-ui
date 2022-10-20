import * as React from "react"
import { useTranslation } from "next-i18next"
import TagsList from "../tags/tags.list"
import TagCreateForm from "../tags/tags.create"
import TagEditForm from "../tags/tags.edit"

const AdminSettingsTagForm = () => {
    const { t } = useTranslation()

    return (
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

    )
}

export default AdminSettingsTagForm