import Head from 'next/head'
import { WindingPage } from '../../components/WindingPage/WindingPage'

export default function WindingHome() {
  return (<>
    <Head>
      <title>Winding</title>
      <meta name="description" content="Winding" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <WindingPage />

  </>)
}
