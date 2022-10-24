import * as React from "react"
import { useTranslation } from "next-i18next"
import { POST_STATES } from "../../services/posts/posts.service"
import PostsTable from "../posts/list/posts.table"
const AdminSettingsPostsForm = () => {
    const { t } = useTranslation()
    const [newPostsPage, setNewPostsPage] = React.useState(0)
    const [moderatedPostsPage, setModeratedPostsPage] = React.useState(0)
    const [publishedPage, setPublishedPostsPage] = React.useState(0)
    const [blockedPage, setBlockedPostsPage] = React.useState(0)

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
                    <PostsTable tagId="" userUuid="" page={`${newPostsPage}`} postState={POST_STATES.NEW} pageSize={10} withModeratorActions onNavigate={(page) => { setNewPostsPage(page) }} />
                </div>
                <div>
                    <h3 className="font-bold leading-tight text-2xl my-2">
                        {t("admin.page.header.posts.on.moderations")}
                    </h3>
                    <PostsTable tagId="" userUuid="" page={`${moderatedPostsPage}`} postState={POST_STATES.ON_MODERATION} withModeratorActions pageSize={10} onNavigate={(page) => { setModeratedPostsPage(page) }} />
                </div>
                <div>
                    <h3 className="font-bold leading-tight text-2xl my-2">
                        {t("admin.page.header.posts.published")}
                    </h3>
                    <PostsTable tagId="" userUuid="" page={`${publishedPage}`} postState={POST_STATES.PUBLISHED} pageSize={10} withModeratorActions onNavigate={(page) => { setPublishedPostsPage(page) }} />
                </div>
                <div>
                    <h3 className="font-bold leading-tight text-2xl my-2">
                        {t("admin.page.header.posts.blocked")}
                    </h3>
                    <PostsTable tagId="" userUuid="" page={`${blockedPage}`} postState={POST_STATES.BLOCKED} pageSize={10} withModeratorActions onNavigate={(page) => { setBlockedPostsPage(page) }} />
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