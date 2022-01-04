import Head from 'next/head'
import { useState } from 'react'
import { Canvas } from "../../components/Canvas/Canvas"
import { ControlPanel } from '../../components/Canvas/ControlPanel'
import Coordinate from '../../components/Canvas/Cooridnate'
import LogisticMap from '../../components/Canvas/LogisticMap'
import { HDiv } from '../../components/Div'
import cl from "./index.module.scss"

export default function Home() {

  const [coordinate, setCoordinate] = useState<Coordinate>(new Coordinate(0,0,0,0,0,0,0,0,0,0))
  const [logisticMap, setLogisticMap] = useState<LogisticMap>(new LogisticMap(-1,-1))

  const apply = (coordinate: Coordinate, logisticMap: LogisticMap) => {
    setCoordinate(coordinate)
    setLogisticMap(logisticMap)
  }

  return (<>
    <Head>
      <title>Logistic Map</title>
      <meta name="description" content="Canvas 2D drawing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className={cl.wrap}>
      <div className={cl.title}>Logistic Map </div>
      <div className={cl.subTitle}>x-axis is nonnegative integer n</div>
      <div className={cl.subTitle}>y-axis is f(...f(f(x0))) where f(x)=hx(1-x) is applied n times starting with initial value x0. Parameter 0&lt;h&lt;4 so that f maps [0,1] into [0,1]</div>
      <HDiv height={10} />
      <Canvas coordinate={coordinate} logisticMap={logisticMap}/>
      <HDiv height={10} />
      <ControlPanel apply={apply} defaultCoordinate={coordinate}
        defaultLogisticMap={logisticMap}/>
    </div>

  </>)
}
