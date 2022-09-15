import * as React from "react"
import Link from "next/link"

const NavigationPanel = () => {

    return (
        <div className="flex flex-1 justify-between max-w-3xl">
            <div className="flex">
                <div className="p-3">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div className="p-3">
                    <Link href="/post">
                        <a>New Post</a>
                    </Link>
                </div>

            </div>
            <div>
                <div className="p-3">
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavigationPanel


