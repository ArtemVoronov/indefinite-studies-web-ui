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
        <div className="flex flex-1">
            <div className="flex flex-col flex-1 flex-grow-0 h-full">
                <AccountSettingsSidebar chosen={visiblePanel} onChoose={(val) => { setVisiblePanel(val) }} />
            </div>
            <div className="flex-1">
                {visiblePanel == ACCOUNT_SETTINGS_PANELS.ACCOUNT && <AccountSettingsAccountForm />}
                {visiblePanel == ACCOUNT_SETTINGS_PANELS.MY_POSTS && <AccountSettingsPostsForm />}
            </div>
        </div>
    )
}

export default AccountSettingsForm