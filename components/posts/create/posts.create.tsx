import * as React from "react"
import { useForm } from "react-hook-form"
import { POSTS_SERVICE } from "../../../services/posts/posts.service"
import { USERS_SERVICE } from "../../../services/users/users.service"
import Router from "next/router"

const PostCreate = () => {
    const { register, handleSubmit } = useForm()

    const createPost = async (data: any) => {
        const { topic, text, previewText } = data

        const profile = await USERS_SERVICE.getMe()
        if (!profile) {
            // TODO: show error
            console.log("unable to get profile")
            return
        }

        const response = await POSTS_SERVICE.create({ authorId: profile.Id, text, topic, previewText })

        if (response.status != 201) {
            // TODO: show error
            console.log("unable to create post")
            return
        }
        Router.push("/post/" + response.data)
    }

    return (
        <div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(createPost)}>
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
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
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
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="group relative w-52 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Create
                    </button>
                </div>
            </form>

        </div>
    )
}

export default PostCreate