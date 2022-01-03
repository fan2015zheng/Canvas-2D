import Head from 'next/head'
import Canvas from '../components/Canvas/Canvas'

export default function Home() {
  return (<>
    <Head>
      <title>Canvas 2D</title>
      <meta name="description" content="Canvas 2D drawing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Canvas width={1000} height={700} maxX={1.1} maxY={1.1} minX={-0.1} minY={-0.1}
      originX={0} originY={0} xLabelGap={0.1} yLabelGap={0.1}/>
  </>)
}
