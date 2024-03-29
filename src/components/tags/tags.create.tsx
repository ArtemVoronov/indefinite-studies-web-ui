import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../services/posts/posts.service"
import { navigate } from 'gatsby'
import { useProfile } from '../hooks/use.profile.hook'
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledTextInput from "../form/styled.input"
import { useTranslation } from "gatsby-plugin-react-i18next"

const TagCreateForm = () => {
  const [profile] = useProfile()
  const [showErrorModal] = useErrorModal()
  const { register, handleSubmit } = useForm()
  const { t } = useTranslation()

  const createTag = async (data: any) => {
    const { name } = data

    if (!profile) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }

    const response = await POSTS_SERVICE.createTag({ name })

    if (response.status != 201) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.create.tag") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }
    window.location.reload()
  }

  return (
    <div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(createTag)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            {t("admin.page.tag.name.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextInput id="name" type="text" placeholder={t("admin.page.tag.name.placeholder")} required register={register} />
          </div>
        </div>
        <div className="flex justify-center">
          <StyledButton text={t("btn.submit")} classes="w-52" />
        </div>
      </form>

    </div>
  )
}

export default TagCreateForm