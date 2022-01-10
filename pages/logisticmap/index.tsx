import Head from 'next/head'
import LogisticMapPage from '../../components/LogisticMapPage/LogisticMapPage'

export default function LogisticMapHome() {
  return (<>
    <Head>
      <title>Logistic Map</title>
      <meta name="description" content="Logistic Map Graph" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <LogisticMapPage />

  </>)
}
