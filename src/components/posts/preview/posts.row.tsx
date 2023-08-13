import * as React from "react"
import { FeedBlock } from "../../../services/feed/feed.service"
import { POSTS_SERVICE, POST_STATES } from "../../../services/posts/posts.service"
import { navigate } from 'gatsby'
import { useErrorModal } from "../../hooks/use.error.modal.hook"
import { ArrowUturnLeftIcon, BookOpenIcon, BriefcaseIcon, NoSymbolIcon, PencilIcon } from "@heroicons/react/24/solid"
import StyledLink from "../../buttons/styled.link"
import { useTranslation } from "gatsby-plugin-react-i18next"
import StyledLinkButton from "../../buttons/styled.link.button"

const PostRow = (props: { post: FeedBlock, withModeratorActions?: boolean }) => {
  const { t } = useTranslation()
  const [showErrorModal] = useErrorModal()
  const { PostUuid, PostTopic, AuthorName } = props.post
  const handleChangeStateEvent = async (state: string) => {
    const response = await POSTS_SERVICE.update({ postUuid: PostUuid, state: state })

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
    navigate(`post/edit/${PostUuid}`)
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

  return (
    <tr className="primary-content-block">
      <td className="text-center">
        <StyledLink href={"/post/" + PostUuid} text={PostTopic} classes="p-1 my-1 text-center" />
      </td>
      {props.withModeratorActions && (<td className="text-center w-64">
        {AuthorName}
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