import * as React from "react"
import { useTranslation } from "next-i18next"
import PostsList from "../posts/list/posts.list"
import { POST_STATES } from "../../services/posts/posts.service"
const AdminSettingsPostsForm = () => {
    const { t } = useTranslation()
    const [newPostsPage, setNewPostsPage] = React.useState(0)
    const [moderatedPostsPage, setModeratedPostsPage] = React.useState(0)

    return (

        <div className="flex flex-1 flex-col justify-center my-2">
            <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                {t("admin.page.header.posts")}
            </h2>
            <div className="">
                <div>
                    <h3 className="font-bold leading-tight text-2xl my-2">
                        {t("admin.page.header.posts.new")}
                    </h3>
                    <PostsList tagId={``} page={`${newPostsPage}`} postState={POST_STATES.NEW} tableView pageSize={10} hideTopNavigation onNavigate={(page) => { setNewPostsPage(page) }} />
                </div>
                <div>
                    <h3 className="font-bold leading-tight text-2xl my-2">
                        {t("admin.page.header.posts.on.moderations")}
                    </h3>
                    <PostsList tagId={``} page={`${moderatedPostsPage}`} postState={POST_STATES.ON_MODERATION} tableView pageSize={10} hideTopNavigation onNavigate={(page) => { setModeratedPostsPage(page) }} />
                </div>
                <div>
                    <h3 className="font-bold leading-tight text-2xl my-2">
                        {t("admin.page.header.comments.new")}
                    </h3>
                    TODO: list of comments awaiting moderation
                </div>
            </div>
        </div>

    )
}

export default AdminSettingsPostsForm