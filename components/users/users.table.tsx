import * as React from "react"
import { FEED_SERVICE } from "../../services/feed/feed.service"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../utils/utils"
import { useTranslation } from "next-i18next"
import { ROLES, User, USERS_SERVICE, USER_STATES } from "../../services/users/users.service"
import Router from "next/router"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledLinkButton from "../buttons/styled.link.button"

const DEFAULT_MAX_USERS_PER_PAGE = 25

const UsersTable = (props: { page: string, pageSize?: number, onNavigate?: (page: number) => void }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const [showErrorModal] = useErrorModal()
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

    const handleBlockUserEvent = async (userUuid: string) => {
        const response = await USERS_SERVICE.update({ Uuid: userUuid, state: USER_STATES.BLOCKED })

        if (response.status == 200) {
            Router.reload()
        } else {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
        }
    }

    const handleUnblockUserEvent = async (userUuid: string) => {
        const response = await USERS_SERVICE.update({ Uuid: userUuid, state: USER_STATES.CONFIRMED })

        if (response.status == 200) {
            Router.reload()
        } else {
            showErrorModal(true,
                t("error.page.unexpected.error.occurred"),
                t("error.page.unable.to.update.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
            )
        }
    }

    React.useEffect(() => {
        fetchUsers()
    }, [props.page, props.pageSize])


    const navigation = (
        <div className="flex justify-center p-3 my-4 border-b-2 primary-content-block"
            style={{ display: (users.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
            <StyledLinkButton
                text={t("btn.prev")} icon={<ArrowLeftIcon />}
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) - 1) : "" }}
                style={{ display: props.page == "0" ? "none" : undefined }}
            />
            <div className="flex-1" />
            <StyledLinkButton
                text={t("btn.next")} icon={<ArrowRightIcon />}
                onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) + 1) : "" }}
                style={{ display: (users.length + 1) != loadedCount ? "none" : undefined }}
            />
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
        <div className="flex flex-1 flex-col">
            {navigation}
            <table className="table-auto flex-1">
                <thead>
                    <tr className="primary-content-block">
                        <th>UUID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(function (p: User, idx) {
                        return (
                            <tr className="primary-content-block" key={idx}>
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
                                <td className="text-center">
                                    {p.Role != ROLES.OWNER && p.State == USER_STATES.CONFIRMED && (
                                        <StyledLinkButton text={t("admin.page.user.block.btn")} onClick={() => handleBlockUserEvent(p.Uuid)} />
                                    )}
                                    {p.Role != ROLES.OWNER && p.State == USER_STATES.BLOCKED && (
                                        <StyledLinkButton text={t("admin.page.user.unblock.btn")} onClick={() => handleUnblockUserEvent(p.Uuid)} />
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable