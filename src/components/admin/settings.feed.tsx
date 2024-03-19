import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { FEED_SERVICE } from "../../services/feed/feed.service"
import StyledButton from "../buttons/styled.button"

const AdminSettingsFeedForm = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-col justify-center items-center my-2">
      <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
        {t("admin.page.header.feed")}
      </h2>
      <div className="">
        <div className="my-2 flex justify-between">
          <StyledButton text={t("admin.page.feed.sync.btn")} onClick={() => { FEED_SERVICE.sync() }} />
          <StyledButton text={t("admin.page.feed.clear.btn")} onClick={() => { FEED_SERVICE.clear() }} />
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsFeedForm