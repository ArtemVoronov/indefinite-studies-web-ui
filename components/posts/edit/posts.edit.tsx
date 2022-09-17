import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../../services/posts/posts.service"
import Router from "next/router"
import { GetServerSidePropsContext } from "next"
import { isNil } from "../../../utils/utils"
import { FEED_SERVICE, FullPostInfo } from "../../../services/feed/feed.service"

const PostEdit = (props: { post: FullPostInfo, onCancel: () => void }) => {
    const { register, handleSubmit } = useForm()
    const { PostId, AuthorId } = props.post.Post

    const updatePost = async (data: any) => {
        const { topic, text, previewText } = data

        const response = await POSTS_SERVICE.update({ postId: PostId, authorId: AuthorId, text, topic, previewText })

        if (response.status == 200) {
            Router.push("/post/" + PostId)
        }
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(updatePost)}>
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                        Topic
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            id="topic"
                            required
                            type="text"
                            {...register("topic")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Type topic ..."
                            defaultValue={props.post.Post.PostTopic}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                        Text
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <textarea
                            id="text"
                            required
                            {...register("text")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Type text ..."
                            rows={30}
                            defaultValue={props.post.Post.PostText}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="previewText" className="block text-sm font-medium text-gray-700">
                        Preview Text
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <textarea
                            id="previewText"
                            required
                            {...register("previewText")}
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Type preview text ..."
                            rows={10}
                            defaultValue={props.post.Post.PostPreviewText}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id
    if (isNil(id)) {
        return { props: {} }
    }
    const response = await FEED_SERVICE.get({ postId: `${id}` })

    if (response.status === 200) {
        const post = response.data
        return { props: { post } }
    }

    return { props: {} }
}

export default PostEdit