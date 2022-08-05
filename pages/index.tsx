import type { NextPage } from "next"
import * as React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import internal from "stream"
import { ApiConfig, DEFAULT_API_CONFIG } from "../services/api/api-config"
import { API_CLIENT } from "../services/api/api-client"
import NotesList from "../components/notes/note.list"
import LoginForm from "../components/auth/login"

const Home: NextPage = (props) => {
	return (
		<div>
			<Head>
				<title>Indefinite Studies</title>
				<meta name="description" content="indefinite studies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div style={{background:"#FEC8D8", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "center"}}>
          header
				</div>
				<div style={{background:"#E0BBE4", minHeight: "64px", flex: 0, display: "flex", alignItems: "center", justifyContent: "center"}}>
          navigation zone
				</div>
				<div style={{background:"#FFDFD3", flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
					<LoginForm/>
				</div>       
			</main>
		</div>
	)
}

export default Home



// export async function getStaticProps(context: any) {
// //   var encodedCredentials = Buffer.from(process.env.AUTH_USERNAME+':'+process.env.AUTH_PASSWORD).toString('base64')

// //   API_CLIENT.setBasicAuthrozationHeader(encodedCredentials)
// //   // await API_CLIENT.users.ping()
// //   //          .then(response => {
// //   //            console.log(response)
// //   //          })
// //   // headers.set('Authorization', encoded);
// //   // await fetch("http://localhost:3005/api/v1/ping", {
// //   //   method:'GET',
// //   //   headers: headers,
       
// //   // })
// //   //   .then(response => {
// //   //     console.log(response)
// //   //   })
//   return {
//     props: {}, // Will be passed to the page component as props
//   }
// }

