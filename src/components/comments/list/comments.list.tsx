import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { FEED_SERVICE, FeedComment } from "../../../services/feed/feed.service"
import CommentView from "../view/comments.view"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"
import { Comment } from "../../../services/comments/comments.service"

// TODO: fetch all with pagination, for now it's used temporary solution:
const OFFSET = 0
const LIMIT = 10000

const CommentsList = (props: {
  postUuid: string, onReplyCommentBtnClick: () => void, onEditCommentBtnClick: () => void,
  renderedCreateCommentFormIndex: number,
  setRenderedCreateCommentFormIndex: (v: number) => void,
  renderedEditCommentFormIndex: number,
  setRenderedEditCommentFormIndex: (v: number) => void
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [comments, setComments] = React.useState([] as Array<Comment>)
  const [loadedCount, setLoadedCount] = React.useState(0)
  const { t } = useTranslation()

  const getCommentIndex = (linkedCommentId: number) => {
    return comments.map(c => c.Id).indexOf(linkedCommentId)
  }

  const fetchComments = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      const response = await FEED_SERVICE.getComments({ offset: OFFSET, limit: LIMIT, postUuid: props.postUuid })
      clearTimeout(timer)
      if (response.status === 200) {
        const portion = response.data.Data
        const count = response.data.Count
        setLoadedCount(count)
        setComments(portion)
      }
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchComments()
  }, [props.postUuid])

  if (isLoading) {
    return (
      <div>
        <Overlay />
      </div>
    )
  }

  if (!comments || comments.length == 0) {
    return (
      <div className="w-full max-w-3xl">
        <div className="p-3 my-4 border-1 primary-content-block text-center ">
          {t("posts.page.no.comments")}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl">
      <div>
        {comments.map(function (p: FeedComment, idx) {
          return (
            <CommentView
              key={idx}
              postUuid={props.postUuid}
              comment={p}
              index={idx + 1}
              onReplyCommentBtnClick={props.onReplyCommentBtnClick}
              onEditCommentBtnClick={props.onEditCommentBtnClick}
              renderedCreateCommentFormIndex={props.renderedCreateCommentFormIndex}
              setRenderedCreateCommentFormIndex={(v: number) => props.setRenderedCreateCommentFormIndex(v)}
              renderedEditCommentFormIndex={props.renderedEditCommentFormIndex}
              setRenderedEditCommentFormIndex={(v: number) => props.setRenderedEditCommentFormIndex(v)}
              getCommentIndex={getCommentIndex}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CommentsList