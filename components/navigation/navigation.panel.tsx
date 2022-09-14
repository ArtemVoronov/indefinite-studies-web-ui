import * as React from 'react'
import Link from 'next/link'
import styles from "./navigation.panel.module.css"

const NavigationPanel = () => {

    return (
        <div className={styles["navigation-panel-wrapper"]}>
            <div className={styles["common-navigation"]}>
                <div className={styles["navigation-btn"]}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div className={styles["navigation-btn"]}>
                    <Link href="/post">
                        <a>New Post</a>
                    </Link>
                </div>

            </div>
            <div className={styles["user-navigation"]}>
                <div className={styles["navigation-btn"]}>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavigationPanel


