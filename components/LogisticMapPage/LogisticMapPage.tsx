import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import LogisticMap, { ILogisticMapRaw } from '../Graph/LogisticMap/LogisticMap'
import { HDiv } from '../../components/Control/Div/Div'
import cl from "./LogisticMapPage.module.scss"
import { ControlPanel } from './ControlPanel'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import { Erase } from '../Graph/Eraser'

export default function LogisticMapPage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 800,
    maxPixelY: 400,
    maxX: 100,
    maxY: 1.05,
    minX: -10,
    minY: -0.1,
    originX: 0,
    originY: 0,
    xLabelGap: 10,
    yLabelGap: 0.1,
    xRulePerLabel: 2, 
    yRulePerLabel: 2
  })

  const [logisticMapRaw, setLogisticMapRaw] = useState<ILogisticMapRaw>({
    h: 1,
    x0: 0.3,
    pointRadius: 3
  })

  const [redraw, setRedraw] = useState<boolean>(true)

  function Draw(canvas: HTMLCanvasElement) {
    if(!redraw) return
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!LogisticMap.IsValid(logisticMapRaw)) return
    Erase(canvas)
    const coordinate = new Coordinate(coordinateRaw)
    const logisticMap = new LogisticMap(logisticMapRaw)
    coordinate.Draw(canvas)
    logisticMap.Draw(canvas, coordinate)

    setRedraw(false)
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Logistic Map </div>
      <div className={cl.subTitle}>x-axis is nonnegative integer n</div>
      <div className={cl.subTitle}>y-axis is f(...f(f(x0))) where f(x)=hx(1-x) is applied n times starting with initial value x0. Parameter 0&lt;h&lt;4 so that f maps [0,1] into [0,1]</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={Draw}/>

      <HDiv height={10} />

      <ControlPanel coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        logisticMapRaw={logisticMapRaw} setLogisticMapRaw={setLogisticMapRaw}
        setRedraw={setRedraw}/>
    </div>
  </>)
}
