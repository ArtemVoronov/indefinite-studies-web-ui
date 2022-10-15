import * as React from "react"
import { POST_SERVICE } from "../../services/posts/posts.service"
import { useTranslation } from "next-i18next"

const AdminSettingsForm = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-1 justify-between min-h-full bg-red-300">
            <div className="flex flex-1 flex-col justify-center bg-purple-300">
                <h2 className="flex justify-center">
                    {t("admin.page.header.tags")}
                </h2>
                <div className="h-96">
                    <div>
                        TODO: list of tags
                    </div>
                    <div>
                        TODO: add tag form
                    </div>
                    <div>
                        TODO: update tag form
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