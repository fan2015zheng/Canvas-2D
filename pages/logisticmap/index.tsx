import Head from 'next/head'
import { useState } from 'react'
import { Canvas } from "../../components/Canvas/Canvas"
import { ControlPanel } from '../../components/Canvas/ControlPanel'
import Coordinate from '../../components/Canvas/Cooridnate'
import LogisticMap from '../../components/Canvas/LogisticMap'
import { HDiv } from '../../components/Control/Div/Div'
import LogisticMapPage from '../../components/LogisticMapPage/LogisticMapPage'
import cl from "./index.module.scss"

export default function LogisticMapHome() {

  const [coordinate, setCoordinate] = useState<Coordinate>(new Coordinate(0,0,0,0,0,0,0,0,0,0))
  const [logisticMap, setLogisticMap] = useState<LogisticMap>(new LogisticMap(-1,-1))

  const apply = (coordinate: Coordinate, logisticMap: LogisticMap) => {
    setCoordinate(coordinate)
    setLogisticMap(logisticMap)
  }

  return (<>
    <Head>
      <title>Logistic Map</title>
      <meta name="description" content="Logistic Map Graph" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <LogisticMapPage />

  </>)
}
