import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import * as React from 'react'
import { API_CLIENT } from '../../services/api/api-client'

const DEFAULT_LIMIT = 25

const NotesList: NextPage = (props) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [posts, setPosts] = React.useState([])
    const [isAllFetched, setIsAllFetched] = React.useState(false)
    const [offset, setOffset] = React.useState(0)

    async function fetchPosts() {
        if (isAllFetched) {
            return
        }
        setIsLoading(true)
        try {
            const response = await API_CLIENT.notes.getAll({ offset, limit: DEFAULT_LIMIT })
            // console.log("response:") // todo clean
            // console.log(response) // todo clean
            if (response.status === 200) {
                const portion = response.data.Data
                // console.log("portion:") // todo clean
                // console.log(portion) // todo clean
                if (portion.length < DEFAULT_LIMIT) {
                    setIsAllFetched(true)
                }
                const updatedList = posts.concat(portion)
                setPosts(updatedList)
                setOffset(offset + DEFAULT_LIMIT)
            }
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPosts()
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (posts.length == 0) return <p>No data</p>

    return (
        <div>
            {posts.map(function(d:{Topic:string}, idx) {
                console.log(d) // todo clean
                return (<li key={idx}>{d.Topic}</li>)
            })}
        </div>
    )
}

// export async function getServerSideProps(context: any) {
//     var encodedCredentials = Buffer.from(process.env.AUTH_USERNAME+':'+process.env.AUTH_PASSWORD).toString('base64')
//     API_CLIENT.setBasicAuthrozationHeader(encodedCredentials)
//         console.log("----------------getServerSideProps")
//         // await API_CLIENT.notes.getAll({offset:0, limit: DEFAULT_LIMIT})
//         //         .then(response => {
//         //             console.log(response)
//         //         })
//         return {
//             props: {}, // Will be passed to the page component as props
//         }
// }

// export const getServerSideProps = withIronSessionApiRoute(
//     async function loginRoute(req, res) {
//         var encodedCredentials = Buffer.from(process.env.AUTH_USERNAME+':'+process.env.AUTH_PASSWORD).toString('base64')
//             req.session.user = {
//                 token: encodedCredentials
//             };
//           await req.session.save();
//           res.send({ ok: true });
//     },
//     {
//         cookieName: "myapp_cookiename",
//         password: "complex_password_at_least_32_characters_long",
//         // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//         cookieOptions: {
//           secure: process.env.NODE_ENV === "production",
//         },
//       },
//   )

export default NotesList


