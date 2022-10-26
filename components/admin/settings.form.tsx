import * as React from "react"
import AdminSettingsFeedForm from "./settings.feed"
import AdminSettingsPostsForm from "./settings.posts"
import AdminSettingsTagForm from "./settings.tags"
import AdminSettingsUserForm from "./settings.users"
import AdminSettingsSidebar from "./settings.sidebar"

export const ADMINS_SETTINGS_PANELS = {
    "TAGS": "TAGS",
    "FEED": "FEED",
    "USERS": "USERS",
    "POSTS": "POSTS"
}

const AdminSettingsForm = () => {
    const [visiblePanel, setVisiblePanel] = React.useState(ADMINS_SETTINGS_PANELS.POSTS)

    return (
        <div className="flex flex-1">
            <div className="flex flex-col flex-1 flex-grow-0 h-full">
                <AdminSettingsSidebar chosen={visiblePanel} onChoose={(val) => { setVisiblePanel(val) }} />
            </div>
            <div className="flex-1">
                {visiblePanel == ADMINS_SETTINGS_PANELS.FEED && <AdminSettingsFeedForm />}
                {visiblePanel == ADMINS_SETTINGS_PANELS.POSTS && <AdminSettingsPostsForm />}
                {visiblePanel == ADMINS_SETTINGS_PANELS.TAGS && <AdminSettingsTagForm />}
                {visiblePanel == ADMINS_SETTINGS_PANELS.USERS && <AdminSettingsUserForm />}
            </div>
        </div>
    )
}

export default AdminSettingsForm