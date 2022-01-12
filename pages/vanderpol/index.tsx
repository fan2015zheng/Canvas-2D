import Head from 'next/head'
import { VanDerPolPage } from '../../components/VanDerPolPage/VanDerPolPage'

export default function VanDerPolHome() {
  return (<>
    <Head>
      <title>Tunnel Diode</title>
      <meta name="description" content="Van Der Pol Oscillation" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <VanDerPolPage />

  </>)
}
