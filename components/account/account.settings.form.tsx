import * as React from "react"
import { useForm } from "react-hook-form"
import Router from "next/router"
import { USERS_SERVICE, User } from "../../services/users/users.service"

const AccountSettingsForm = (props: { user: User }) => {
    // const { register, handleSubmit } = useForm()

    const { Id, Login, Email, Role, State } = props.user

    // const updateUser = (data: any) => {
    //     // const { id, login, email, role, state } = data
    //     // TODO:
    //     console.log("update user:", data)

    // }
    // TODO: add updating of settings
    return (
        // <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        //     <div className="w-full max-w-3xl">
        //         <form className="mt-8 space-y-4" onSubmit={handleSubmit(updateUser)}>
        //             <div>
        //                 <label htmlFor="login" className="block text-sm font-medium text-gray-700">
        //                     Login
        //                 </label>
        //                 <div className="relative mt-1 rounded-md shadow-sm">
        //                     <input
        //                         id="login"
        //                         required
        //                         type="text"
        //                         {...register("login")}
        //                         className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        //                         placeholder="Type login ..."
        //                         defaultValue={Login}
        //                     />
        //                 </div>
        //             </div>
        //             <div>
        //                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        //                     Email
        //                 </label>
        //                 <div className="relative mt-1 rounded-md shadow-sm">
        //                     <input
        //                         id="email"
        //                         required
        //                         {...register("email")}
        //                         className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        //                         placeholder="Type email ..."
        //                         defaultValue={Email}
        //                     />
        //                 </div>
        //             </div>
        //             <div>
        //                 <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        //                     Role
        //                 </label>
        //                 <div className="relative mt-1 rounded-md shadow-sm">
        //                     <input
        //                         id="role"
        //                         required
        //                         {...register("role")}
        //                         className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        //                         placeholder="Type role ..."
        //                         defaultValue={Email}
        //                     />
        //                 </div>
        //             </div>


        //             <div>
        //                 <button
        //                     type="submit"
        //                     className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //                 >
        //                     Update
        //                 </button>

        //             </div>
        //         </form>

        //     </div>
        // </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Login</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Login}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Role</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Role}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">State</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{State}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default AccountSettingsForm