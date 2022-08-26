import type { NextPage } from "next"
import * as React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import LoginForm from "../components/auth/login"
import PostsList from "../components/posts/posts.list"

const Home: NextPage = () => {


	return (
		<div>
			<Head>
				<title>Indefinite Studies</title>
				<meta name="description" content="indefinite studies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div style={{ background: "#FEC8D8", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
					header
				</div>
				<div style={{ background: "#E0BBE4", minHeight: "64px", flex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
					navigation zone
				</div>
				<div style={{ background: "#FFDFD3", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
					<div style={{ background: "#FFDFD3", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
						<div style={{ background: "#D291BC", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
							<LoginForm />
						</div>
						<div style={{ background: "#957DAD", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
							<PostsList />
						</div>

					</div>
				</div>
			</main>
		</div>
	)
}

export default Home