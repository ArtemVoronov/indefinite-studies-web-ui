import type { NextPage } from "next"
import * as React from "react"
import AccountSettingsForm from "../../components/account/account.settings.form"
import { useProfile } from '../../components/hooks/use.profile.hook'

const AccountSettingsPage: NextPage = () => {
    const [profile, setProfile] = useProfile()

    return (
        <div className="w-full max-w-3xl m-3 p-3 flex-1 flex items-center justify-center">
            {!profile ? "No data" : <AccountSettingsForm user={profile} />}
        </div>
    )
}

export default AccountSettingsPage