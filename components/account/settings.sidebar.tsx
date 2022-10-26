import * as React from "react"
import { useTranslation } from "next-i18next"
import { classNames } from "../../utils/utils"
import { ACCOUNT_SETTINGS_PANELS } from "./settings.form"

// TODO: add chosing option by anchor
const AccountSettingsSidebar = (props: { chosen: string, onChoose: (val: string) => void }) => {
    const { t } = useTranslation()

    return (
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 flex flex-col flex-1">
            <ul className="flex flex-col flex-1">
                <li>
                    <a href="#" onClick={() => { props.onChoose(ACCOUNT_SETTINGS_PANELS.ACCOUNT) }}
                        className={classNames(
                            props.chosen == ACCOUNT_SETTINGS_PANELS.ACCOUNT ? "bg-indigo-100" : "",
                            "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">{t('account.page.sidebar.account')}</span>
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => { props.onChoose(ACCOUNT_SETTINGS_PANELS.MY_POSTS) }}
                        className={classNames(
                            props.chosen == ACCOUNT_SETTINGS_PANELS.MY_POSTS ? "bg-indigo-100" : "",
                            "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">{t('account.page.sidebar.my.posts')}</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default AccountSettingsSidebar