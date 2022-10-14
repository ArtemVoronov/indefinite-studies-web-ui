import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import AccountView from "../../components/account/view/account.view"
import { useProfile } from '../../components/hooks/use.profile.hook'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"

const AccountViewPage: NextPage = () => {
    const { t } = useTranslation()
    const [profile] = useProfile()

    return (
        <div className="w-full max-w-3xl m-3 p-3 flex-1 flex items-center justify-center">
            {!profile ? t("no.data") : <AccountView user={profile} />}
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const locale = context?.locale ?? "ru"
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export default AccountViewPage