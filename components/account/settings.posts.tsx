import * as React from "react"
import { useTranslation } from "next-i18next"
import { useProfile } from '../../components/hooks/use.profile.hook'
import PostsTable from "../posts/list/posts.table"

const AccountSettingsPostsForm = () => {
    const { t } = useTranslation()
    const [profile] = useProfile()
    const [postsPage, setPostsPage] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(5)

    return (
        <div className="flex flex-1 flex-col justify-center my-2">
            <div className="flex justify-center">
                <div className="m-2 w-36">
                    <label>{t("admin.page.label.page.size")}</label>
                    <select onChange={(e: any) => { setPageSize(e.target.value) }} className="dark:bg-slate-400 mt-1 block max-w-xs w-48 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-1">
                <div className="m-2 flex-1">
                    <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                        {t("account.page.header.my.posts")}
                    </h2>
                    <PostsTable tagId="" postState="" userUuid={!profile ? "" : profile.Uuid} page={`${postsPage}`} pageSize={pageSize} onNavigate={(page) => { setPostsPage(page) }} />
                </div>
            </div>
        </div>

    )
}

export default AccountSettingsPostsForm