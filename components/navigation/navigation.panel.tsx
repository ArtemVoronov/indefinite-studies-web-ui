import * as React from "react"
import Link from "next/link"
import faviconPic from '../../public/favicon.ico'
import Image from "next/image"
import { ROLES, USERS_SERVICE } from "../../services/users/users.service"
import NotAuthorizedUserButton from "../buttons/not.authorized.user.button"
import AuthorizedUserButton from "../buttons/authorized.user.button"
import { useProfile } from '../hooks/use.profile.hook'
import { ACCESS_TOKEN_KEY } from "../../services/auth/auth.service"
import { API_CLIENT } from "../../services/api/api-client"

const NavigationPanel = () => {
    const [profile, setProfile] = useProfile()

    React.useEffect(() => {
        API_CLIENT.setJWTAuthrozationHeader(window.localStorage[ACCESS_TOKEN_KEY])
        USERS_SERVICE.getMe().then((res) => {
            if (!res) {
                return
            }
            setProfile(res)
        })
    }, [])

    return (
        <div className="flex justify-between items-center max-w-3xl flex-1">
            <div className="flex items-center">
                <Link href="/">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center">
                        <Image src={faviconPic} alt="Indefinite Studies" />
                    </a>
                </Link>
            </div>
            <div className="flex items-center">
                <Link href="/">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center ml-5">
                        Posts
                    </a>
                </Link>
                {profile && profile.Role == ROLES.OWNER && (
                    <Link href="/post">
                        <a className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center ml-5">New Post</a>
                    </Link>
                )}
                {!profile ? <NotAuthorizedUserButton /> : <AuthorizedUserButton user={profile} />}
            </div>
        </div>
    )
}

export default NavigationPanel


