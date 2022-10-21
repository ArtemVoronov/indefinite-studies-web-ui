import * as React from "react"
import { useTranslation } from "next-i18next"
import PostsList from "../posts/list/posts.list"
import { useProfile } from '../../components/hooks/use.profile.hook'

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
                    <PostsList tagId="" postState="" userUuid={!profile ? "" : profile.Uuid} page={`${postsPage}`} tableView pageSize={10} hideTopNavigation onNavigate={(page) => { setPostsPage(page) }} />
                </div>
            </div>
        </div>

    )
}

export default AccountSettingsPostsForm