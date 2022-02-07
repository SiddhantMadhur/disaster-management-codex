import Head from 'next/head'
import NavBar from '../components/navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Disaster Management</title>
        <meta name='description' content='Disaster management webapp. Made by Siddhant Madhur and Raghav Bhatia as part of the Codex Competition.' />
      </Head>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </div>

  )
}

export default MyApp
