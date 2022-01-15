import Head from 'next/head'
import { LinearizationPage } from '../../components/LinearizationPage/LinearizationPage'

export default function LinearizationHome() {
  return (<>
    <Head>
      <title>Linearization</title>
      <meta name="description" content="Linearization" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <LinearizationPage />

  </>)
}
