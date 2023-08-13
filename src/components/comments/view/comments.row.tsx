import * as React from "react"
import { FeedComment } from "../../../services/feed/feed.service"
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { COMMENTS_SERVICE, COMMENT_STATES } from "../../../services/comments/comments.service"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon } from "@heroicons/react/20/solid"
import StyledLink from "../../buttons/styled.link"
import { useTranslation } from "gatsby-plugin-react-i18next"
import StyledLinkButton from "../../buttons/styled.link.button"

const CommentRow = (props: { comment: FeedComment }) => {
  const { t } = useTranslation()
  const [showErrorModal] = useErrorModal()
  const { PostUuid, AuthorUuid, CommentId, CommentUuid, AuthorName, CommentText } = props.comment

  const handleChangeStateEvent = async (state: string) => {
    const response = await COMMENTS_SERVICE.update({ authorUuid: AuthorUuid, postUuid: PostUuid, commentId: CommentId, commentUuid: CommentUuid, state })

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

  return (
    <tr className="primary-content-block">
      <td className="text-center w-64">
        {AuthorName}
      </td>
      <td className="text-center">
        {CommentText}
      </td>
      <td className="text-center w-64">
        <div className="flex">
          {ModeratorActionsPanel}
          <StyledLink href={"/post/" + PostUuid} text={t("btn.open")} />
        </div>
      </td>
    </tr>
  )
}

export default CommentRow