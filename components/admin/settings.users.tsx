import * as React from "react"
import { useTranslation } from "next-i18next"
import UsersList from "../users/users.list"

const AdminSettingsUserForm = () => {
    const { t } = useTranslation()
    const [usersPage, setUsersPage] = React.useState(0)

    return (
        <div className="flex flex-1 flex-col justify-center my-2">
            <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                {t("admin.page.header.users")}
            </h2>
            <div className="">
                <div>
                    <UsersList page={`${usersPage}`} pageSize={10} hideTopNavigation onNavigate={(page) => { setUsersPage(page) }} />
                </div>
                <div>
                    TODO: add karma to users (after some sum of karma no need to modearte of comments, posts, etc)
                </div>
            </div>
        </div>
    )
}

export default AdminSettingsUserForm