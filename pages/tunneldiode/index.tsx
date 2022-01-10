import Head from 'next/head'
import { TunnelDiodePage } from '../../components/TunnelDiodePage/TunnelDiodePage'

export default function TunnelDiodeHome() {
  return (<>
    <Head>
      <title>Tunnel Diode</title>
      <meta name="description" content="Tunnel Diode Graph" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <TunnelDiodePage />

  </>)
}
