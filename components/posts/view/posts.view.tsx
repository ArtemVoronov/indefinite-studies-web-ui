import * as React from "react"
import { FullPostInfo } from "../../../services/feed/feed.service"
import { ROLES } from "../../../services/users/users.service"
import Router from "next/router"
import MarkDown from "../../markdown/markdown"
import { useProfile } from '../../hooks/use.profile.hook'

const PostView = (props: { post: FullPostInfo }) => {
    const [profile, setProfile] = useProfile()
    const { PostId, PostTopic, PostText, AuthorId } = props.post.Post

    const handleEditEvent = () => {
        Router.push("/post/edit/" + PostId)
    }

    const EditPanel = (
        <div className="flex justify-end">
            <button
                className="text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleEditEvent}
            >
                Edit
            </button>
        </div>
    )

    return (
        <div className="p-3 my-4 bg-white border-b-2 border-gray-100">
            {!profile || profile.Id != AuthorId || profile.Role != ROLES.OWNER ? "" : EditPanel}
            <h1 className="font-extrabold leading-tight text-6xl mt-0 mb-2 text-center">{PostTopic}</h1>
            <MarkDown text={PostText} />
        </div>

    )
}

export default PostView