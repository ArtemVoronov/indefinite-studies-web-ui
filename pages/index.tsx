import type { NextPage } from "next"
import * as React from "react"
import PostsList from "../components/posts/list/posts.list"

const HomePage: NextPage = () => {
	return (
		<PostsList />
	)
}

export default HomePage