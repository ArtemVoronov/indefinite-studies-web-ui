import * as React from "react"
import { POSTS_SERVICE, POST_STATES, Post } from "../../../services/posts/posts.service"
import { navigate } from 'gatsby'
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon, PencilIcon } from "@heroicons/react/24/solid"
import StyledLink from "../../buttons/styled.link"
import { useTranslation } from "gatsby-plugin-react-i18next"
import StyledLinkButton from "../../buttons/styled.link.button"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { USERS_SERVICE } from "../../../services/users/users.service"
import Overlay from "../../overlay/overlay"

const PostRow = (props: { postUuid: string, withModeratorActions?: boolean }) => {
  const { t } = useTranslation()
  const [showErrorModal] = useErrorModal()
  const [isLoading, setIsLoading] = React.useState(false)
  const [post, setPost] = React.useState({} as Post)
  const handleChangeStateEvent = async (state: string) => {
    const response = await POSTS_SERVICE.update({ postUuid: props.postUuid, state: state })

    if (response.status == 200) {
      window.location.reload()
    } else {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.update.post") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
    }
  }

  const handleEditEvent = () => {
    navigate(`/post/edit/${props.postUuid}`)
  }

  const ModeratorActionsPanel = (
    <>
      <StyledLinkButton onClick={() => { handleChangeStateEvent(POST_STATES.NEW) }}
        icon={<ArrowUturnLeftIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.new")} />}
      />
      <StyledLinkButton onClick={() => { handleChangeStateEvent(POST_STATES.ON_MODERATION) }}
        icon={<BriefcaseIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.moderate")} />}
      />
      <StyledLinkButton onClick={() => { handleChangeStateEvent(POST_STATES.PUBLISHED) }}
        icon={<BookOpenIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.publish")} />}
      />
      <StyledLinkButton onClick={() => { handleChangeStateEvent(POST_STATES.BLOCKED) }}
        icon={<NoSymbolIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.edit")} />}
      />
    </>
  )


  const fetchPostPreview = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      let response = await POSTS_SERVICE.getPreview({ postUuid: props.postUuid })
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
    fetchPostPreview()
  }, [props.postUuid])

  if (isLoading || !post || Object.keys(post).length === 0) {
    return (
      <div>
        <Overlay />
      </div>
    )
  }

  return (
    <tr className="primary-content-block">
      <td className="text-center">
        <StyledLink href={"/post/" + props.postUuid} text={post.Topic} classes="p-1 my-1 text-center" />
      </td>
      {props.withModeratorActions && (<td className="text-center w-64">
        {post.AuthorName}
      </td>)}
      <td className="text-center w-64">
        <div className="flex justify-center">
          {!props.withModeratorActions ? "" : ModeratorActionsPanel}
          <StyledLinkButton onClick={handleEditEvent}
            icon={<PencilIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.edit")} />}
          />
        </div>
      </td>
    </tr>
  )
}

export default PostRow