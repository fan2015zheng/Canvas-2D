import Head from 'next/head'
import { useState } from 'react'
import Canvas from '../components/Canvas/Canvas'
import { TextField } from '../components/Field/TextField'
import cl from "./index.module.scss"

export default function Home() {
  const [maxX, setMaxX] = useState()
  const [maxY, setMaxY] = useState()
  const [minX, setMinX] = useState()
  const [minY, setMinY] = useState()
  const [originX, setOriginX] = useState()
  const [originY, setOriginY] = useState()
  const [xLabelGap, setXLabelGap] = useState()
  const [yLabelGap, setYLabelGap] = useState()

  return (<>
    <Head>
      <title>Canvas 2D</title>
      <meta name="description" content="Canvas 2D drawing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className={cl.wrap}>
      <Canvas width={1000} height={600} maxX={maxX} maxY={maxY} minX={minX} minY={minY}
        originX={originX} originY={originY} xLabelGap={xLabelGap} yLabelGap={yLabelGap}/>
      <div className={cl.fields}>
        <TextField prompt="Max X" value={maxX} setValue={setMaxX} />
        <TextField prompt="Max Y" value={maxY} setValue={setMaxY} />
        <TextField prompt="Min X" value={minX} setValue={setMinX} />
        <TextField prompt="Min Y" value={minY} setValue={setMinY} />
        <TextField prompt="Origin X" value={originX} setValue={setOriginX} />
        <TextField prompt="Origin Y" value={originY} setValue={setOriginY} />
        <TextField prompt="X Label Gap" value={xLabelGap} setValue={setXLabelGap} />
        <TextField prompt="Y Label Gap" value={yLabelGap} setValue={setYLabelGap} />
      </div>
    </div>

  </>)
}
