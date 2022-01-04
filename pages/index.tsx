import Head from 'next/head'
import cl from "./index.module.scss"

export default function Home() {

  return (<>
    <Head>
      <title>Canvas 2D</title>
      <meta name="description" content="Canvas 2D drawing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className={cl.wrap}>
      Canvas 2D
    </div>

  </>)
}
