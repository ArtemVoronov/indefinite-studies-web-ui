import * as React from "react"
import { FEED_SERVICE } from "../../../services/feed/feed.service"
import PostPreview from "../preview/posts.preview"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Overlay from "../../overlay/overlay"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import { useTranslation } from "gatsby-plugin-react-i18next"
import StyledLink from "../../buttons/styled.link"
import StyledLinkButton from "../../buttons/styled.link.button"

const DEFAULT_MAX_POSTS_PER_PAGE = 5

const PostsList = (props: {
  tagId: string, page: string, postState: string, userUuid: string,
  hideTopNavigation?: boolean, hideBottomNavigation?: boolean, pageSize?: number, onNavigate?: (page: number) => void
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [postUuids, setPostUuids] = React.useState([])
  const [loadedCount, setLoadedCount] = React.useState(0)
  const { t } = useTranslation()
  const MAX_POSTS_PER_PAGE = props.pageSize ? props.pageSize : DEFAULT_MAX_POSTS_PER_PAGE
  const LIMIT = MAX_POSTS_PER_PAGE + 1

  const fetchPostsUuids = async () => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      const response = await FEED_SERVICE.getPosts({ offset: parseInt(props.page) * MAX_POSTS_PER_PAGE, limit: LIMIT, tagId: props.tagId, state: props.postState, userUuid: props.userUuid })
      clearTimeout(timer)
      if (response.status === 200) {
        const portion = response.data.Data
        const count = response.data.Count
        setLoadedCount(count)
        if (count > MAX_POSTS_PER_PAGE) {
          setPostUuids(portion.slice(0, MAX_POSTS_PER_PAGE))
        } else {
          setPostUuids(portion)
        }
      }
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPostsUuids()
  }, [props.page, props.tagId])

  const getNavPathPrev = () => {
    if (props.tagId != "") {
      return "/posts/" + props.tagId + "/" + (parseInt(props.page) - 1)
    } else {
      return "/posts/" + (parseInt(props.page) - 1)
    }
  }

  const getNavPathNext = () => {
    if (props.tagId != "") {
      return "/posts/" + props.tagId + "/" + (parseInt(props.page) + 1)
    } else {
      return "/posts/" + (parseInt(props.page) + 1)
    }
  }

  const navigation = (
    <div className="flex justify-center p-3 my-4 border-b-2 primary-content-block"
      style={{ display: (postUuids.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
      <StyledLink href={getNavPathPrev()} text={t("btn.prev")} icon={<ArrowLeftIcon />} style={{ display: props.page == "0" ? "none" : undefined }} />
      <div className="flex-1" />
      <StyledLink href={getNavPathNext()} text={t("btn.next")} icon={<ArrowRightIcon />} style={{ display: (postUuids.length + 1) != loadedCount ? "none" : undefined }} />
    </div>
  )

  const outerNavigation = (
    <div className="flex justify-center p-3 my-4 border-b-2 primary-content-block"
      style={{ display: (postUuids.length + 1) != loadedCount && props.page == "0" ? "none" : undefined }}>
      <StyledLinkButton
        text={t("btn.prev")} icon={<ArrowLeftIcon />}
        onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) - 1) : "" }}
        style={{ display: props.page == "0" ? "none" : undefined }}
      />
      <div className="flex-1" />
      <StyledLinkButton
        text={t("btn.next")} icon={<ArrowRightIcon />}
        onClick={() => { props.onNavigate ? props.onNavigate(parseInt(props.page) + 1) : "" }}
        style={{ display: (postUuids.length + 1) != loadedCount ? "none" : undefined }}
      />
    </div>
  )


  if (isLoading) return (
    <div>
      <Overlay />
    </div>
  )

  if (postUuids.length == 0) return (
    <div>
      {t("no.data")}
      {navigation}
    </div>
  )

  return (
    <div className="w-full max-w-3xl">
      {!props.hideTopNavigation && (props.onNavigate ? outerNavigation : navigation)}
      <div>
        {postUuids.map(function (p: string, idx) {
          return (
            <PostPreview key={idx} postUuid={p} />
          )
        })}
      </div>
      {!props.hideBottomNavigation && (props.onNavigate ? outerNavigation : navigation)}
    </div>
  )
}

export default PostsList