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
import { GraphERLine } from '../Graph/TunnelDiodeCircuit/GraphTunnelDiode'
import { TunnelDiodeButtonPanel } from './TunnelDiodeButtonPanel'

export function TunnelDiodePage() {
  
  const [diodeCoordinateRaw, setDiodeCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 300, maxY: 50,
    minX: -50, minY: -5,
    originX: 0, originY: 0,
    xLabelGap: 50, yLabelGap: 5,
    xRulePerLabel: 5, yRulePerLabel: 2
  })
  const [circuitCoordinateRaw, setCircuitCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 3000, maxY: 220,
    minX: -250, minY: -20,
    originX: 0, originY: 0,
    xLabelGap: 500, yLabelGap: 50,
    xRulePerLabel: 2, yRulePerLabel: 5
  })
  const [diodeRaw, setDiodeRaw] = useState<ITunnelDiodeRaw>({
    x1: 50, y1: 25, x2: 100, y2: 5, x3: 200, y3: 20, lineWidth: 2})
  
  const [circuitRaw, setCircuitRaw] = useState<ITunnelDiodeCircuitRaw>({
    R: 10, C: 100, L: 100, E: 100,
    lineWidth: 2, timeStep: 0.1, voltageC0: 10, currentL0: 500
  })

  const [showSecondLine, setShowSecondLine] = useState<boolean>(false)

  function DiodeDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(diodeCoordinateRaw)) return
    if(!TunnelDiode.IsValid(diodeRaw)) return
    const coordinate = new Coordinate(diodeCoordinateRaw)
    const diode = new TunnelDiode(diodeRaw)
    coordinate.Draw(canvas)
    diode.Draw(canvas, coordinate)

    if(!showSecondLine) return
    if(!TunnelDiodeCircuit.IsValid(circuitRaw)) return
    const circuit = new TunnelDiodeCircuit(circuitRaw, diode)
    GraphERLine(canvas, coordinate, circuit.E, circuit.R)
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
      <DiodeParameterPanel tunnelDiodeRaw={diodeRaw} setTunnelDiodeRaw={setDiodeRaw}
        showSecondLine={showSecondLine} setShowSecondLine={setShowSecondLine}/>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={circuitCoordinateRaw} setCoordinateRaw={setCircuitCoordinateRaw} 
        Draw={CircuitDraw}/>
      <CircuitParameterPanel circuitRaw={circuitRaw} setCircuitRaw={setCircuitRaw}/>
      <HDiv height={10} />

      <TunnelDiodeButtonPanel circuitRaw={circuitRaw} setCircuitRaw={setCircuitRaw}/>
    </div>
  </>)
}
