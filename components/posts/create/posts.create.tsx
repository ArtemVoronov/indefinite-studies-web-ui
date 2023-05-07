import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE, Tag } from "../../../services/posts/posts.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import AssignTagsForm from "../tags/assign.tags.form"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"
import StyledTextArea from "../../form/styled.textarea"
import StyledTextInput from "../../form/styled.input"

const PostCreate = () => {
  const [profile] = useProfile()
  const [showErrorModal] = useErrorModal()
  const { register, handleSubmit } = useForm()
  const { t } = useTranslation()
  const [tags, setTags] = React.useState([] as Tag[])

  const createPost = async (data: any) => {
    const { topic, text, previewText } = data

    if (!profile) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.get.profile") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }

    const response = await POSTS_SERVICE.create({ authorUuid: profile.Uuid, text, topic, previewText, tagIds: [...tags.map(e => e.Id)] })

    if (response.status != 201) {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.create.post") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
      return
    }
    Router.push("/post/" + response.data)
  }

  return (
    <div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(createPost)}>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium">
            {t("post.page.post.topic.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextInput id="topic" required register={register} placeholder={t("post.page.post.topic.placeholder")} />
          </div>
        </div>
        <div>
          <label htmlFor="text" className="block text-sm font-medium">
            {t("post.page.post.text.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextArea id="text" required register={register} placeholder={t("post.page.post.text.placeholder")} rows={30} />
          </div>
        </div>
        <div>
          <label htmlFor="text" className="block text-sm font-medium">
            {t("post.page.post.preview.text.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextArea id="previewText" required register={register} placeholder={t("post.page.post.preview.text.placeholder")} rows={10} />
          </div>
        </div>

        <div>
          <AssignTagsForm onChange={(tags: Tag[]) => { setTags(tags) }} />
        </div>

        <div className="flex justify-center">
          <StyledButton text={t("btn.submit")} />
        </div>
      </form>
    </div>
  )
}

export default PostCreate