import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import { useProfile } from '../../components/hooks/use.profile.hook'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"
import AccountSettingsForm from "../../components/account/settings.form"

const AccountViewPage: NextPage = () => {
    const { t } = useTranslation()
    const [profile] = useProfile()

    return (
        <div className="w-full flex flex-1">
            {!profile ? t("no.data") : <AccountSettingsForm />}
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