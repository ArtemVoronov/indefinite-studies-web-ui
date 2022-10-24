import * as React from "react"
import { useTranslation } from "next-i18next"
import { useProfile } from '../../components/hooks/use.profile.hook'
import PostsTable from "../posts/list/posts.table"

const AccountSettingsPostsForm = () => {
    const { t } = useTranslation()
    const [profile] = useProfile()
    const [postsPage, setPostsPage] = React.useState(0)

    return (

        <div className="flex flex-1 flex-col justify-center my-2">
            <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                {t("account.page.header.my.posts")}
            </h2>
            <div className="">
                <div>
                    <PostsTable tagId="" postState="" userUuid={!profile ? "" : profile.Uuid} page={`${postsPage}`} pageSize={10} onNavigate={(page) => { setPostsPage(page) }} />
                </div>
            </div>
        </div>

    )
}

export default AccountSettingsPostsForm