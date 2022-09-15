import * as React from "react"
import Link from "next/link"
import faviconPic from '../../public/favicon.ico'
import Image from 'next/image'

import { UserIcon } from '@heroicons/react/24/outline'
const NavigationPanel = () => {

    return (
        <div className="flex justify-between items-center max-w-3xl flex-1">
            <div className="flex items-center">
                <Link href="/">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center">
                        <Image src={faviconPic} alt="Indefinite Studies" />
                    </a>
                </Link>
            </div>
            <div className="flex items-center">
                <Link href="/">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center ml-5">
                        Posts
                    </a>
                </Link>
                <Link href="/post">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center ml-5">New Post</a>
                </Link>
                <Link href="/login">
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900 ml-5 flex">
                        {/* TODO: add popup menu with sign in option */}
                        <UserIcon className="h-5 w-5 ml-2" />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default NavigationPanel


