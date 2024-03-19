import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { ADMINS_SETTINGS_PANELS } from "./settings.form"
import SidebarButton from "../buttons/sidebar.button"
import { DocumentTextIcon, FilmIcon, HashtagIcon, UserIcon, WrenchIcon } from "@heroicons/react/24/solid"

// TODO: add chosing option by anchor
const AdminSettingsSidebar = (props: { chosen: string, onChoose: (val: string) => void }) => {
  const { t } = useTranslation()

  return (
    <div className="overflow-y-auto py-4 px-3 primary-navbar flex flex-col flex-1">
      <ul className="flex flex-col flex-1">
        <li>
          <SidebarButton href="#" text={t('admin.page.sidebar.posts')}
            active={props.chosen == ADMINS_SETTINGS_PANELS.POSTS}
            onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.POSTS) }}
            icon={<DocumentTextIcon />}
          />
        </li>
        {/* TODO: add user admin actions later */}
        {/* <li>
          <SidebarButton href="#" text={t('admin.page.sidebar.users')}
            active={props.chosen == ADMINS_SETTINGS_PANELS.USERS}
            onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.USERS) }}
            icon={<UserIcon />}
          />
        </li> */}
        <li>
          <SidebarButton href="#" text={t('admin.page.sidebar.tags')}
            active={props.chosen == ADMINS_SETTINGS_PANELS.TAGS}
            onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.TAGS) }}
            icon={<HashtagIcon />}
          />
        </li>
        <li>
          <SidebarButton href="#" text={t('admin.page.sidebar.feed')}
            active={props.chosen == ADMINS_SETTINGS_PANELS.FEED}
            onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.FEED) }}
            icon={<FilmIcon />}
          />
        </li>
        <li>
          <SidebarButton href="#" text={t('admin.page.sidebar.ui')}
            active={props.chosen == ADMINS_SETTINGS_PANELS.UI}
            onClick={() => { props.onChoose(ADMINS_SETTINGS_PANELS.UI) }}
            icon={<WrenchIcon />}
          />
        </li>
      </ul>
    </div>
  )
}

export default AdminSettingsSidebar