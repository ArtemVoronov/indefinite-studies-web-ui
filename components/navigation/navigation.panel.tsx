import * as React from "react"
import faviconPic from '../../public/favicon.ico'
import Image from "next/image"
import { ROLES, USERS_SERVICE } from "../../services/users/users.service"
import NotAuthorizedUserButton from "../buttons/not.authorized.user.button"
import AuthorizedUserButton from "../buttons/authorized.user.button"
import { useProfile } from '../hooks/use.profile.hook'
import { ACCESS_TOKEN_KEY } from "../../services/auth/auth.service"
import { API_CLIENT } from "../../services/api/api-client"
import { useTranslation } from 'next-i18next'
import ToggleButton from "../buttons/toggle.button"
import { useTheme } from "../hooks/use.theme.hook"
import { CURRENT_THEME_KEY, THEMES } from "../context/theme.context"
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import StyledMenuLink from "../buttons/styled.menu.link"

const NavigationPanel = () => {
    const [profile, setProfile] = useProfile()
    const [theme, setTheme] = useTheme()
    const { t } = useTranslation()

    const initTheme = (value: string) => {
        if (value == THEMES.DAY) {
            setTheme(THEMES.DAY)
            window.localStorage[CURRENT_THEME_KEY] = THEMES.DAY
            document.documentElement.classList.remove('dark')
        } else {
            window.localStorage[CURRENT_THEME_KEY] = THEMES.NIGHT
            document.documentElement.classList.add('dark')
            setTheme(THEMES.NIGHT)
        }
    }

    React.useEffect(() => {
        if (!window.localStorage[CURRENT_THEME_KEY]) {
            initTheme(THEMES.DAY)
        } else {
            initTheme(window.localStorage[CURRENT_THEME_KEY])
        }
    }, [])

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
                <StyledMenuLink href="/posts/0" text=""
                    icon={<Image src={faviconPic} alt="Indefinite Studies" />}
                    classes="flex items-center text-base font-medium ml-5"
                />
                <div className="ml-5 flex items-center">
                    <ToggleButton action={() => { initTheme(theme == THEMES.DAY ? THEMES.NIGHT : THEMES.DAY) }}
                        icon={theme == THEMES.DAY ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        checked={theme == THEMES.NIGHT}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <StyledMenuLink href="/posts/0" text={t("navbar.posts.link")} classes="text-base font-medium ml-5" />
                {profile && profile.Role == ROLES.OWNER && (
                    <StyledMenuLink href="/post" text={t("navbar.new.post.link")} classes="text-base font-medium ml-5" />
                )}
                {!profile ? <NotAuthorizedUserButton /> : <AuthorizedUserButton user={profile} />}
            </div>
        </div>
    )
}

export default NavigationPanel


