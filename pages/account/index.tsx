import type { NextPage } from "next"
import * as React from "react"
import AccountView from "../../components/account/view/account.view"
import { useProfile } from '../../components/hooks/use.profile.hook'

const AccountViewPage: NextPage = () => {
    const [profile] = useProfile()

    return (
        <div className="w-full max-w-3xl m-3 p-3 flex-1 flex items-center justify-center">
            {!profile ? "No data" : <AccountView user={profile} />}
        </div>
    )
}

export default AccountViewPage