import * as React from "react"
import { useTranslation } from "next-i18next"
import { ADMINS_SETTINGS_PANELS } from "./settings.form"
import SidebarButton from "../buttons/sidebar.button"
import { CogIcon } from "@heroicons/react/24/solid"

// TODO: add chosing option by anchor
const AdminSettingsSidebar = (props: { chosen: string, onChoose: (val: string) => void }) => {
    const { t } = useTranslation()

    return (
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 flex flex-col flex-1">
            <ul className="flex flex-col flex-1">
                <li>
                    <SidebarButton href="#" text={t('admin.page.sidebar.posts')}
                        active={props.chosen == ADMINS_SETTINGS_PANELS.POSTS}
                        onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.POSTS) }}
                        icon={<CogIcon />}
                    />
                </li>
                <li>
                    <SidebarButton href="#" text={t('admin.page.sidebar.users')}
                        active={props.chosen == ADMINS_SETTINGS_PANELS.USERS}
                        onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.USERS) }}
                        icon={<CogIcon />}
                    />
                </li>
                <li>
                    <SidebarButton href="#" text={t('admin.page.sidebar.tags')}
                        active={props.chosen == ADMINS_SETTINGS_PANELS.TAGS}
                        onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.TAGS) }}
                        icon={<CogIcon />}
                    />
                </li>
                <li>
                    <SidebarButton href="#" text={t('admin.page.sidebar.feed')}
                        active={props.chosen == ADMINS_SETTINGS_PANELS.FEED}
                        onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.FEED) }}
                        icon={<CogIcon />}
                    />
                </li>
            </ul>
        </div>
    )
}

export default AdminSettingsSidebar