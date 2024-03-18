import { XMarkIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { POSTS_SERVICE, Tag } from "../../../services/posts/posts.service"
import { DEFAULT_LIMIT, SPIN_ICON_SHOWING_TIMEOUT } from "../../../utils/utils"
import Overlay from "../../overlay/overlay"

const AssignTagsForm = (props: { initialValue?: Tag[], onChange: (tags: Tag[]) => void }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [tags, setTags] = React.useState([])
  const [isAllFetched, setIsAllFetched] = React.useState(false)
  const [offset, setOffset] = React.useState(0)
  const { t } = useTranslation()
  const [selectedTags, setSelectedTags] = React.useState([...(props.initialValue ? props.initialValue : [])] as Tag[])

  const fetchTags = async () => {
    if (isAllFetched) {
      return
    }
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      const response = await POSTS_SERVICE.getTags({ offset, limit: DEFAULT_LIMIT })
      clearTimeout(timer)
      if (response.status === 200) {
        const count = response.data.Count
        const portion = response.data.Data
        if (!portion) {
          return
        }
        if (count != 0) {
          setTags(tags.concat(portion))
        }
        if (portion.length == DEFAULT_LIMIT) {
          setOffset(offset + DEFAULT_LIMIT)
        }
        if (portion.length < DEFAULT_LIMIT) {
          setIsAllFetched(true)
        }
      }
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchTags()
  }, [offset])


  if (isLoading) return (
    <div>
      <Overlay />
    </div>
  )

  if (tags.length == 0) return (
    <div>
      {t("no.data")}
    </div>
  )

  const handleSelectTag = (e: any) => {
    const tagId = e.target.value
    const selectedOption = e.target.options[e.target.selectedIndex]
    const tagName = selectedOption.getAttribute('label')
    const arr = [{ Id: parseInt(tagId), Name: tagName }]
    const index = selectedTags.map(e => e.Id).indexOf(tagId)
    if (index == -1) {
      const result = selectedTags.concat(arr)
      setSelectedTags(result)
      props.onChange(result)
    }
  }

  const handleUnselectTag = (tagId: number) => {
    const index = selectedTags.map(e => e.Id).indexOf(tagId)
    if (index != -1) {
      const left = selectedTags.slice(0, index)
      const right = selectedTags.slice(index + 1)
      const result = [...left, ...right]
      setSelectedTags(result)
      props.onChange(result)
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col">
        <div className="flex">
          {selectedTags.map(function (p: Tag, idx) {
            return (
              <div
                onClick={() => { handleUnselectTag(p.Id) }}
                className="primary-button flex items-center py-2 pl-2 pr-1 m-1 cursor-pointer text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                key={idx}>
                {p.Name}
                <span>
                  <XMarkIcon className="h-5 w-5 primary-button-text" aria-hidden="true" />
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col">
          <label htmlFor="tagId" className="block text-sm font-medium">{t("post.page.tags.label")}</label>
          <select multiple onChange={handleSelectTag} id="tagId" className="primary-input mt-1 block max-w-xs rounded-md border py-2 px-3 shadow-sm sm:text-sm">
            {tags.map(function (p: Tag, idx) {
              return selectedTags.map(e => e.Id).indexOf(p.Id) != -1 ? "" : (
                <option value={p.Id} label={p.Name} key={idx} />
              )
            })}
          </select>
        </div>
      </div>
    </div >
  )
}

export default AssignTagsForm