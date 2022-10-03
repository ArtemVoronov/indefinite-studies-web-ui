import * as React from "react"
import { useForm } from "react-hook-form"
import { USERS_SERVICE } from "../../services/users/users.service"
import Image from 'next/image'
import faviconPic from '../../public/favicon.ico'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Link from "next/link"

const RestorePasswordForm = (props: { token: string }) => {
    const { register, handleSubmit } = useForm()
    const [isDone, setDone] = React.useState(false)
    const { token } = props
    const resend = (data: any) => {
        const { password } = data
        USERS_SERVICE.confirmPassword({ token, password }).then((res) => {
            console.log("res: ", res) // todo clean
            if (!res) {
                // TODO; show error
                return
            }
            if (res.status != 200) {
                // TODO; show error
                return
            }
            setDone(true)
        })
    }

    if (isDone) {
        return (
            <div className="flex flex-1 justify-center items-center flex-col h-screen">
                <p>Password was changed</p>
                <Link href="/login">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Image src={faviconPic} alt="Indefinite Studies" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Send restore password link
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(resend)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                {...register("password")}
                                className="relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Restore password
                        </button>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default RestorePasswordForm