import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { ACCOUNT_SETTINGS_PANELS } from "./settings.form"
import SidebarButton from "../buttons/sidebar.button"
import { CogIcon, TvIcon } from "@heroicons/react/24/solid"

// TODO: add chosing option by anchor
const AccountSettingsSidebar = (props: { chosen: string, onChoose: (val: string) => void }) => {
  const { t } = useTranslation()

  return (
    <div className="overflow-y-auto py-4 px-3 primary-navbar flex flex-col flex-1">
      <ul className="flex flex-col flex-1">
        <li>
          <SidebarButton href="#" text={t('account.page.sidebar.account')}
            active={props.chosen == ACCOUNT_SETTINGS_PANELS.ACCOUNT}
            onClick={() => { props.onChoose(ACCOUNT_SETTINGS_PANELS.ACCOUNT) }}
            icon={<TvIcon />}
          />
        </li>
        <li>
          <SidebarButton href="#" text={t('account.page.sidebar.my.posts')}
            active={props.chosen == ACCOUNT_SETTINGS_PANELS.MY_POSTS}
            onClick={() => { props.onChoose(ACCOUNT_SETTINGS_PANELS.MY_POSTS) }}
            icon={<CogIcon />}
          />
        </li>
      </ul>
    </div>
  )
}

export default AccountSettingsSidebar