import * as React from "react"
import AccountSettingsAccountForm from "./settings.account"
import AccountSettingsPostsForm from "./settings.posts"
import AccountSettingsSidebar from "./settings.sidebar"

export const ACCOUNT_SETTINGS_PANELS = {
    "ACCOUNT": "ACCOUNT",
    "MY_POSTS": "MY_POSTS"
}

const AccountSettingsForm = () => {
    const [visiblePanel, setVisiblePanel] = React.useState(ACCOUNT_SETTINGS_PANELS.ACCOUNT)

    return (
        <div className="flex flex-1 justify-between flex-col min-h-full">
            <AccountSettingsSidebar chosen={visiblePanel} onChoose={(val) => { setVisiblePanel(val) }} />
            {visiblePanel == ACCOUNT_SETTINGS_PANELS.ACCOUNT && <AccountSettingsAccountForm />}
            {visiblePanel == ACCOUNT_SETTINGS_PANELS.MY_POSTS && <AccountSettingsPostsForm />}
        </div>
    )
}

export default AccountSettingsForm