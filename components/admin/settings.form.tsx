import * as React from "react"
import { useTranslation } from "next-i18next"
import TagsList from "../tags/tags.list"
import TagCreateForm from "../tags/tags.create"
import TagEditForm from "../tags/tags.edit"

const AdminSettingsForm = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-1 justify-between min-h-full bg-red-300">
            <div className="flex flex-1 flex-col justify-center bg-purple-300">
                <h2 className="flex justify-center">
                    {t("admin.page.header.tags")}
                </h2>
                <div className="">
                    <div>
                        <h3 className="flex justify-center">
                            {t("admin.page.header.tags.list")}
                        </h3>
                        <TagsList />
                    </div>
                    <div>
                        <h3 className="flex justify-center">
                            {t("admin.page.header.tags.create")}
                        </h3>
                        <TagCreateForm />
                    </div>
                    <div>
                        <h3 className="flex justify-center">
                            {t("admin.page.header.tags.edit")}
                        </h3>
                        <TagEditForm />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center bg-blue-300">
                <h2 className="flex justify-center">
                    {t("admin.page.header.posts")}
                </h2>
                <div className="h-96">
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
            <div className="flex flex-1 flex-col justify-center bg-red-300">
                <h2 className="flex justify-center">
                    {t("admin.page.header.users")}
                </h2>
                <div className="h-96">
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