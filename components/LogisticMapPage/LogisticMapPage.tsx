import Head from 'next/head'
import { useState } from 'react'
import Coordinate from '../Graph/Coordinate/Coordinate'
import LogisticMap from '../Graph/LogisticMap/LogisticMap'
import { HDiv } from '../../components/Control/Div/Div'
import cl from "./LogisticMapPage.module.scss"
import { ControlPanel } from './ControlPanel'
import { Canvas } from '../DrawingPad/Canvas'
import { CoordinateParameterPanel } from "../DrawingPad/CoordinateParameterPanel"

export default function LogisticMapPage() {

  const [coordinate, setCoordinate] = useState<Coordinate>(
    new Coordinate(800, 400, 100, 1.05, -10, -0.1, 0, 0, 10, 0.1, 2, 2))
  const [logisticMap, setLogisticMap] = useState<LogisticMap>(
    new LogisticMap(1, 0.3, 3))

  const Draw = (canvas: HTMLCanvasElement) => {
    
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
      <div className={cl.drawingPad}>
        <div className={cl.canvasDiv}>
          {
            !coordinate.maxPixelX && !coordinate.maxPixelY ?
            <Canvas width={coordinate.maxPixelX!} height={coordinate.maxPixelY!} Draw={Draw}/> : null
          }
        </div>
        <div className={cl.coordinateControlPanelDiv}>
          <CoordinateParameterPanel coordinate={coordinate} setCoordinate={setCoordinate}/>
        </div>
      </div>
      <HDiv height={10} />
      <ControlPanel coordinate={coordinate} setCoordinate={setCoordinate} logisticMap={logisticMap}/>
    </div>
  </>)
}
