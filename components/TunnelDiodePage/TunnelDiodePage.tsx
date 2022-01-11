import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import { Erase } from '../Graph/Eraser'
import cl from "./TunnelDiodePage.module.scss"
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { TunnelDiode } from '../Graph/TunnelDiodeCircuit/TunnelDiode'
import { ITunnelDiodeRaw } from "../Graph/TunnelDiodeCircuit/TunnelDiode"

export function TunnelDiodePage() {
  
  const [diodeCoordinateRaw, setDiodeCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 5, maxY: 5,
    minX: -2, minY: -2,
    originX: 0, originY: 0,
    xLabelGap: 1, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  const [circuitCoordinateRaw, setCircuitCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 200, maxY: 200,
    minX: -200, minY: -200,
    originX: 0, originY: 0,
    xLabelGap: 50, yLabelGap: 50,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  const [diodeRaw, setDiodeRaw] = useState<ITunnelDiodeRaw>({
    x1: 1, y1: 2, x2: 2, y2: 1, x3: 3, y3: 2, lineWidth: 1})

  function DiodeDraw(canvas: HTMLCanvasElement) {
    const coordinate = new Coordinate(diodeCoordinateRaw)
    const diode = new TunnelDiode(diodeRaw)
    coordinate.Draw(canvas)
    diode.Draw(canvas, coordinate)
  }

  function CircuitDraw(canvas: HTMLCanvasElement) {

  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Tunnel Diode</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={diodeCoordinateRaw} setCoordinateRaw={setDiodeCoordinateRaw} 
        Draw={DiodeDraw}/>

      <HDiv height={10} />

      <DrawingPad coordinateRaw={circuitCoordinateRaw} setCoordinateRaw={setCircuitCoordinateRaw} 
        Draw={CircuitDraw}/>
    </div>
  </>)
}
