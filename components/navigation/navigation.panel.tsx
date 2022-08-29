import * as React from 'react'
import Link from 'next/link'

const NavigationPanel = () => {

    return (
        <div>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </li>
                <li>
                    <Link href="/post">
                        <a>Post</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationPanel


