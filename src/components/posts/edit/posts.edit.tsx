import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE, Post, Tag } from "../../../services/posts/posts.service"
import { navigate } from 'gatsby'
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"
import AssignTagsForm from "../tags/assign.tags.form"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import StyledButton from "../../buttons/styled.button"
import StyledTextArea from "../../form/styled.textarea"
import StyledTextInput from "../../form/styled.input"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { USERS_SERVICE } from "../../../services/users/users.service"

const PostEdit = (props: { postUuid: string }) => {
  const { register, handleSubmit } = useForm()
  const { t } = useTranslation()
  const [showErrorModal] = useErrorModal()
  const [tags, setTags] = React.useState([] as Tag[])

  const [isLoading, setIsLoading] = React.useState(false)
  const [post, setPost] = React.useState({} as Post)

  const updatePost = async (data: any) => {
    const { topic, text, previewText } = data

    const response = await POSTS_SERVICE.update({ postUuid: post.Uuid, authorUuid: post.AuthorUuid, text, topic, previewText, tagIds: [...tags.map(e => e.Id)] })

    if (response.status == 200) {
      navigate("/post/" + props.postUuid)
    } else {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.update.post") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
    }
  }

  // const fetchPost = async () => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(true)
  //   }, SPIN_ICON_SHOWING_TIMEOUT)

  //   try {
  //     const response = await POSTS_SERVICE.get({ postUuid: props.postUuid })
  //     clearTimeout(timer)
  //     if (response.status === 200) {
  //       const feedPost = response.data as Post
  //       setPost(feedPost)
  //       setTags(feedPost.Post.Tags)
  //     }
  //   } finally {
  //     clearTimeout(timer)
  //     setIsLoading(false)
  //   }
  // }

  const fetchPost = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      let response = await POSTS_SERVICE.get({ postUuid: props.postUuid })
      clearTimeout(timer)
      if (response.status !== 200) {
        return
      }
      let loadedPost = response.data as Post

      response = await USERS_SERVICE.getUserName({ Uuid: loadedPost.AuthorUuid })
      if (response.status !== 200) {
        return
      }

      loadedPost.AuthorName = response.data

      setPost(loadedPost)
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPost()
  }, [])

  if (isLoading) return (
    <div>
      <Overlay />
    </div>
  )

  if (!post || Object.keys(post).length === 0) return (
    <div>
      {t("no.data")}
    </div>
  )

  return (
    <div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(updatePost)}>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium">
            {t("post.page.post.topic.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextInput id="topic" required register={register} placeholder={t("post.page.post.topic.placeholder")} defaultValue={post.Topic} />
          </div>
        </div>
        <div>
          <label htmlFor="text" className="block text-sm font-medium">
            {t("post.page.post.text.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextArea id="text" required register={register} placeholder={t("post.page.post.text.placeholder")} rows={30} defaultValue={post.Text} />
          </div>
        </div>
        <div>
          <label htmlFor="previewText" className="block text-sm font-medium">
            {t("post.page.post.preview.text.label")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <StyledTextArea id="previewText" required register={register} placeholder={t("post.page.post.preview.text.placeholder")} rows={10} defaultValue={post.PreviewText} />
          </div>
        </div>


        <div>
          <AssignTagsForm initialValue={post.Tags} onChange={(tags: Tag[]) => { setTags(tags) }} />
        </div>


        <div className="flex justify-center">
          <StyledButton text={t("btn.submit")} />
        </div>
      </form>

      <div className="flex justify-center">
        <StyledButton text={t("btn.cancel")} onClick={() => { navigate(`/account`) }} />
      </div>
    </div>
  )
}

export default PostEdit