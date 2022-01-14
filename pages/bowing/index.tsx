import Head from 'next/head'
import { BowingPage } from '../../components/BowingPage/BowingPage'

export default function BowingHome() {
  return (<>
    <Head>
      <title>Bowing a Violin String</title>
      <meta name="description" content="Bowing a Violin String" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <BowingPage />

  </>)
}
