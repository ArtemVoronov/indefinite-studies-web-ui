import type { NextPage } from "next"
import * as React from "react"
import AccountSettingsForm from "../../components/account/account.settings.form"
import { useProfile } from '../../components/hooks/use.profile.hook'

const AccountSettingsPage: NextPage = () => {
    const [profile, setProfile] = useProfile()

    return (
        <div>
            {!profile ? "No data" : <AccountSettingsForm user={profile} />}
        </div>
    )
}

export default AccountSettingsPage