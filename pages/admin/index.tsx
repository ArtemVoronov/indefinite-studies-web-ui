import type { GetServerSidePropsContext, NextPage } from "next"
import * as React from "react"
import { useProfile } from '../../components/hooks/use.profile.hook'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"
import AdminSettingsForm from "../../components/admin/settings.form"

const AdminPage: NextPage = () => {
    const { t } = useTranslation()
    const [profile] = useProfile()

    return (
        <div className="w-full">
            {!profile ? t("no.data") : <AdminSettingsForm />}
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

export default AdminPage