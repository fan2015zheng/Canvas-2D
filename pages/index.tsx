import Head from 'next/head'
import { useState } from 'react'
import { Canvas } from "../components/Canvas/Canvas"
import { ControlPanel } from '../components/Canvas/ControlPanel'
import Coordinate from '../components/Canvas/Cooridnate'
import { HDiv } from '../components/Div'
import cl from "./index.module.scss"

export default function Home() {

  const [coordinate, setCoordinate] = useState<Coordinate>(new Coordinate(0,0,0,0,0,0,0,0,0,0))

  const apply = (coordinate: Coordinate) => {
    setCoordinate(coordinate)
  }

  return (<>
    <Head>
      <title>Canvas 2D</title>
      <meta name="description" content="Canvas 2D drawing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className={cl.wrap}>
      <Canvas coordinate={coordinate}/>
      <HDiv height={10} />
      <ControlPanel apply={apply} defaultCoordinate={coordinate}/>
    </div>

  </>)
}
