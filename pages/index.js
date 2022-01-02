import Head from 'next/head'
import Canvas from '../components/Canvas/Canvas'

export default function Home() {
  return (<>
    <Head>
      <title>Canvas 2D</title>
      <meta name="description" content="Canvas 2D drawing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Canvas width={600} height={500}/>
  </>)
}
