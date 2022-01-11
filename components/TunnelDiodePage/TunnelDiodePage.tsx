import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import { Erase } from '../Graph/Eraser'
import cl from "./TunnelDiodePage.module.scss"
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { TunnelDiode } from '../Graph/TunnelDiodeCircuit/TunnelDiode'
import { ITunnelDiodeRaw } from "../Graph/TunnelDiodeCircuit/TunnelDiode"
import { DiodeParameterPanel } from './DiodeParameterPanel'
import { ITunnelDiodeCircuitRaw, TunnelDiodeCircuit } from '../Graph/TunnelDiodeCircuit/TunnelDiodeCircuit'
import { CircuitParameterPanel } from './CircuitParameterPanel'

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
    minX: -20, minY: -200,
    originX: 0, originY: 0,
    xLabelGap: 20, yLabelGap: 50,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  const [diodeRaw, setDiodeRaw] = useState<ITunnelDiodeRaw>({
    x1: 1, y1: 2, x2: 2, y2: 1, x3: 3, y3: 2, lineWidth: 1})
  
  const [circuitRaw, setCircuitRaw] = useState<ITunnelDiodeCircuitRaw>({
    R: 10, C: 10, L: 10, E: 10,
    lineWidth: 1, timeStep: 0.01, voltageC0: 10, currentL0: -10
  })

  function DiodeDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(diodeCoordinateRaw)) return
    if(!TunnelDiode.IsValid(diodeRaw)) return
    const coordinate = new Coordinate(diodeCoordinateRaw)
    const diode = new TunnelDiode(diodeRaw)
    coordinate.Draw(canvas)
    diode.Draw(canvas, coordinate)
  }

  function CircuitDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(circuitCoordinateRaw)) return
    if(!TunnelDiode.IsValid(diodeRaw)) return
    if(!TunnelDiodeCircuit.IsValid(circuitRaw)) return
    const coordinate = new Coordinate(circuitCoordinateRaw)
    const diode = new TunnelDiode(diodeRaw)
    const circuit = new TunnelDiodeCircuit(circuitRaw, diode)
    coordinate.Draw(canvas)
    circuit.Draw(canvas, coordinate)
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Tunnel Diode</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={diodeCoordinateRaw} setCoordinateRaw={setDiodeCoordinateRaw} 
        Draw={DiodeDraw}/>
      <DiodeParameterPanel tunnelDiodeRaw={diodeRaw} setTunnelDiodeRaw={setDiodeRaw}/>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={circuitCoordinateRaw} setCoordinateRaw={setCircuitCoordinateRaw} 
        Draw={CircuitDraw}/>
      <CircuitParameterPanel circuitRaw={circuitRaw} setCircuitRaw={setCircuitRaw}/>
    </div>
  </>)
}
