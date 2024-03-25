import * as React from "react"
import { FeedComment } from "../../../services/feed/feed.service"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { COMMENTS_SERVICE, COMMENT_STATES, Comment } from "../../../services/comments/comments.service"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "gatsby-plugin-react-i18next"
import StyledLinkButton from "../../buttons/styled.link.button"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { USERS_SERVICE } from "../../../services/users/users.service"
import Overlay from "../../overlay/overlay"

const CommentRow = (props: { postUuid: string, comment: FeedComment }) => {
  const { t } = useTranslation()
  const [showErrorModal] = useErrorModal()
  const [isLoading, setIsLoading] = React.useState(false)
  const [comment, setComment] = React.useState({} as Comment)

  const fetchComment = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      let response = await COMMENTS_SERVICE.get({ postUuid: props.postUuid, commentId: props.comment.Id })
      clearTimeout(timer)

      if (response.status !== 200) {
        return
      }
      let loadedComment = response.data as Comment

      response = await USERS_SERVICE.getUserName({ Uuid: loadedComment.AuthorUuid })
      if (response.status !== 200) {
        return
      }

      loadedComment.AuthorName = response.data

      setComment(loadedComment)
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchComment()
  }, [props.postUuid])

  const handleChangeStateEvent = async (state: string) => {
    const response = await COMMENTS_SERVICE.update({ authorUuid: comment.AuthorUuid, postUuid: comment.PostUuid, commentId: comment.Id, state })

    if (response.status == 200) {
      window.location.reload()
    } else {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.update.comment") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
    }
  }

  const ModeratorActionsPanel = (
    <>
      <StyledLinkButton onClick={() => { handleChangeStateEvent(COMMENT_STATES.NEW) }}
        icon={<ArrowUturnLeftIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.new")} />} />
      <StyledLinkButton onClick={() => { handleChangeStateEvent(COMMENT_STATES.ON_MODERATION) }}
        icon={<BriefcaseIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.moderate")} />} />
      <StyledLinkButton onClick={() => { handleChangeStateEvent(COMMENT_STATES.PUBLISHED) }}
        icon={<BookOpenIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.publish")} />} />
      <StyledLinkButton onClick={() => { handleChangeStateEvent(COMMENT_STATES.BLOCKED) }}
        icon={<NoSymbolIcon className="h-8 w-8 primary-link-icon" aria-hidden="true" title={t("btn.edit")} />} />
    </>
  )

  React.useEffect(() => {
    fetchComment()
  }, [props.postUuid])

  if (isLoading || !comment || Object.keys(comment).length === 0) {
    return (
      <div>
        <Overlay />
      </div>
    )
  }

  return (
    <tr className="primary-content-block">
      <td className="text-center w-64">
        {comment.AuthorName}
      </td>
      <td className="text-center">
        {comment.Text}
      </td>
      <td className="text-center w-64">
        <div className="flex">
          {ModeratorActionsPanel}
        </div>
      </td>
    </tr>
  )
}

export default CommentRow