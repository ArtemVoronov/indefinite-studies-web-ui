import * as React from "react"
import { FEED_SERVICE } from "../../services/feed/feed.service"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../utils/utils"
import { useTranslation } from "next-i18next"
import { User } from "../../services/users/users.service"

const DEFAULT_MAX_USERS_PER_PAGE = 5

const UsersList = (props: { page: string, hideTopNavigation?: boolean, hideBottomNavigation?: boolean, pageSize?: number, onNavigate?: (page: number) => void }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const [loadedCount, setLoadedCount] = React.useState(0)
    const { t } = useTranslation()
    const MAX_USERS_PER_PAGE = props.pageSize ? props.pageSize : DEFAULT_MAX_USERS_PER_PAGE
    const LIMIT = MAX_USERS_PER_PAGE + 1

    const fetchUsers = async () => {
        const timer = setTimeout(() => {
            setIsLoading(true)
        }, SPIN_ICON_SHOWING_TIMEOUT)

        try {
            const response = await FEED_SERVICE.getUsers({ offset: parseInt(props.page) * MAX_USERS_PER_PAGE, limit: LIMIT })
            clearTimeout(timer)
            if (response.status === 200) {
                const portion = response.data.Data
                const count = response.data.Count
                setLoadedCount(count)
                if (count > MAX_USERS_PER_PAGE) {
                    setUsers(portion.slice(0, MAX_USERS_PER_PAGE))
                } else {
                    setUsers(portion)
                }
            }
        } finally {
            clearTimeout(timer)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchUsers()
    }, [props.page])


    const navigation = (
        <div className="flex justify-center p-3 my-4 bg-white border-b-2 border-gray-100"
            style={{ display: (users.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
            <a
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) - 1) : "" }}
                style={{ display: props.page == "0" ? "none" : undefined }}
                className="cursor-pointer text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
                {t("btn.prev")}
                <ArrowLeftIcon />
            </a>
            <div className="flex-1" />
            <a
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) + 1) : "" }}
                style={{ display: (users.length + 1) != loadedCount ? "none" : undefined }}
                className="cursor-pointer text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
                {t("btn.next")}
                <ArrowRightIcon />
            </a>
        </div>
    )


    if (isLoading) return (
        <div>
            <Overlay />
        </div>
    )

    if (users.length == 0) return (
        <div>
            {t("no.data")}
            {navigation}
        </div>
    )

    return (
        <div className="w-full max-w-3xl">
            {!props.hideTopNavigation && navigation}
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-white">
                        <th>UUID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(function (p: User, idx) {
                        return (
                            <tr className="bg-white" key={idx}>
                                <td className="text-center">
                                    <div className="p-1 my-1 text-center text-indigo-600 hover:text-indigo-500">
                                        {p.Uuid}
                                    </div>
                                </td>
                                <td className="text-center">
                                    {p.Email}
                                </td>
                                <td className="text-center">
                                    {p.Login}
                                </td>
                                <td className="text-center">
                                    {p.Role}
                                </td>
                                <td className="text-center">
                                    {p.State}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {!props.hideBottomNavigation && navigation}
        </div>
    )
}

export default UsersList