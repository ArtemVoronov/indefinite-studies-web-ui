import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useConfirmModal } from "../hooks/use.confirm.modal.hook"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"

const CONFIRM_TITLE = "Что такое Lorem Ipsum?"
const CONFIRM_TEXT = `Что такое Lorem Ipsum? Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник 
создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только 
успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время 
послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной 
вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.`

const ERORR_TITLE = "Ошибка доступа к чему-то"
const ERORR_TEXT = "Случилась внезапная ошибка доступа к чему-то. Повторите действие попозже или перезгрузите страницу."

const AdminSettingsUIForm = () => {
  const { t } = useTranslation()
  const [showConfirmModal] = useConfirmModal()
  const [showErrorModal] = useErrorModal()

  return (
    <div className="flex flex-1 flex-col justify-center items-center my-2">
      <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
        {t("admin.page.header.ui")}
      </h2>
      <div className="">
        <div className="flex items-center">
          <StyledButton text={t("admin.page.show.text.confirm.modal")} onClick={() => showConfirmModal(true, CONFIRM_TITLE, CONFIRM_TEXT, () => { console.log("conirmed") })} />
          <StyledButton text={t("admin.page.show.text.error.modal")} onClick={() => showErrorModal(true, ERORR_TITLE, ERORR_TEXT)} />
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsUIForm