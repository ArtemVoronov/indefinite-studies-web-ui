import * as React from "react"
import { useTranslation } from "next-i18next"
import { POST_STATES } from "../../services/posts/posts.service"
import PostsTable from "../posts/list/posts.table"
import { COMMENT_STATES } from "../../services/comments/comments.service"
import CommentsTable from "../comments/list/comments.table"

const AdminSettingsPostsForm = () => {
    const { t } = useTranslation()
    const [postState, setPostState] = React.useState(POST_STATES.NEW)
    const [commentState, setCommentState] = React.useState(COMMENT_STATES.NEW)
    const [pageSize, setPageSize] = React.useState(5)
    const [postsPage, setPostsPage] = React.useState(0)
    const [commentsPage, setCommentsPage] = React.useState(0)

    return (
        <div className="flex flex-1 flex-col justify-center my-2">
            <div className="flex justify-center">
                <div className="m-2">
                    <label>{t("admin.page.label.post.state")}</label>
                    <select onChange={(e: any) => { setPostState(e.target.value) }} className="dark:bg-slate-400 mt-1 block max-w-xs w-48 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {Object.values(POST_STATES).map((p: string, idx: number) => {
                            return <option key={idx} value={p} label={p} />
                        })}
                    </select>
                </div>
                <div className="m-2">
                    <label>{t("admin.page.label.comment.state")}</label>
                    <select onChange={(e: any) => { setCommentState(e.target.value) }} className="dark:bg-slate-400 mt-1 block max-w-xs w-48 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {Object.values(COMMENT_STATES).map((p: string, idx: number) => {
                            return <option key={idx} value={p} label={p} />
                        })}
                    </select>
                </div>
                <div className="m-2 w-36">
                    <label>{t("admin.page.label.page.size")}</label>
                    <select onChange={(e: any) => { setPageSize(e.target.value) }} className="dark:bg-slate-400 mt-1 block max-w-xs w-48 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <div className="m-2 flex-1">
                    <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                        {t("admin.page.header.posts")}
                    </h2>
                    <PostsTable tagId="" userUuid="" page={`${postsPage}`} postState={postState} pageSize={pageSize} withModeratorActions onNavigate={(page) => { setPostsPage(page) }} />
                </div>
                <div className="m-2 flex-1">
                    <h2 className="flex justify-center font-extrabold leading-tight text-4xl mt-0 mb-2 text-center">
                        {t("admin.page.header.comments")}
                    </h2>
                    <CommentsTable page={`${commentsPage}`} commentState={commentState} pageSize={pageSize} onNavigate={(page) => { setCommentsPage(page) }} />
                </div>


            </div>
        </div>

    )
}

export default AdminSettingsPostsForm