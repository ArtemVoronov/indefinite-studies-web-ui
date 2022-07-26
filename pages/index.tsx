import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Indefinite Studies</title>
        <meta name="description" content="indefinite studies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{background:'#FEC8D8', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          header
        </div>
        <div style={{background:'#E0BBE4', minHeight: '64px', flex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          navigation zone
        </div>
        <div style={{background:'#FFDFD3', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          posts  zone
        </div>       
      </main>
    </div>
  )
}

export default Home
