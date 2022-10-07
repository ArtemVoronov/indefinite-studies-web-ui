import * as React from "react"
import { useForm } from "react-hook-form"
import { FeedComment, FeedCommentWithIndex } from "../../../services/feed/feed.service"
import { COMMENTS_SERVICE } from "../../../services/comments/comments.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'
import CommentLink from "../link/comments.link"
import { useTranslation } from "next-i18next"

const CommentEdit = (props: { comment: FeedComment, linkedComment?: FeedCommentWithIndex, onCancel: () => void }) => {
    const [profile] = useProfile()
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm()
    const { comment } = props
    const { PostId, CommentId, CommentText } = comment

    const updateComment = async (data: any) => {
        const { text } = data

        if (!profile) {
            // TODO: show error
            console.log("unable to get profile")
            return
        }

        const response = await COMMENTS_SERVICE.update({ authorId: profile.Id, commentId: CommentId, text })

        if (response.status != 200) {
            // TODO: show error
            console.log("unable to update comment")
            return
        }
        Router.reload()
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(updateComment)}>
                {props.linkedComment && (
                    <div className="text-xs">
                        {"To: "}
                        <CommentLink postId={PostId} commentIndex={props.linkedComment?.Index + 1 ?? 0} />
                    </div>
                )}
                <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                        Comment Text
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <textarea
                            id="text"
                            required
                            {...register("text")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Type text ..."
                            rows={10}
                            defaultValue={CommentText}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="group relative w-52 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Update
                    </button>
                </div>
            </form>
            <div className="flex justify-center">
                <button
                    type="submit"
                    onClick={props.onCancel}
                    className="group relative w-52 mt-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
            </div>

        </div>
    )
}

export default CommentEdit