import type { NextPage } from "next"
import * as React from "react"
import PostsList from "../components/posts/posts.list"

const HomePage: NextPage = () => {

	return (
		<div style={{ background: "#FFDFD3", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
			<div style={{ background: "#957DAD", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
				<PostsList />
			</div>
		</div>
	)
}

export default HomePage