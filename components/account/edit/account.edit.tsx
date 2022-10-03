import * as React from "react"
import { useForm } from "react-hook-form"
import { User, USERS_SERVICE } from "../../../services/users/users.service"
import Router from "next/router"
import { useProfile } from '../../hooks/use.profile.hook'

const AccountView = (props: { user: User, onCancel: () => void }) => {
    const { register, handleSubmit } = useForm()
    const [, setProfile] = useProfile()

    const { Id, Login } = props.user

    const updateUser = async (data: any) => {
        const { login, password } = data

        const response = await USERS_SERVICE.update({ id: Id, login, password: password != "" ? password : undefined })

        if (response.status == 200) {
            USERS_SERVICE.getMe().then((res) => {
                if (!res) {
                    return
                }
                setProfile(res)
                Router.push("/account/")
            })
        } else {
            // TODO: show error
            console.error("unable to update user")
        }
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <form className="mt-8 space-y-4" onSubmit={handleSubmit(updateUser)}>
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                            Login
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                id="login"
                                required
                                type="text"
                                {...register("login")}
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Type login ..."
                                defaultValue={Login}
                            />
                        </div>
                    </div>
                    {/* TODO: email changing with confirmation */}
                    {/* <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                id="email"
                                required
                                {...register("email")}
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Type email ..."
                                defaultValue={Email}
                            />
                        </div>
                    </div> */}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password")}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
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
        </div>
    )
}

export default AccountView