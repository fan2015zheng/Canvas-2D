import Coordinate from "../Coordinate/Coordinate"
import {TunnelDiodeCircuit} from "./TunnelDiodeCircuit"

export function GraphTunnelDiodeCircuit(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, circuit: TunnelDiodeCircuit) {
  
  if(!canvas || !coordinate || !circuit) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const path = TunnelDiodeCircuitPath(coordinate, circuit)
  ctx.lineWidth = circuit.lineWidth
  ctx.stroke(path)
}

function TunnelDiodeCircuitPath(coordinate: Coordinate, circuit: TunnelDiodeCircuit) {
  const co = coordinate
  const path = new Path2D()
  const tMax = co.maxX
  const timeStep = circuit.timeStep
  let t = 0
  let currentL = circuit.currentL0
  let voltageC = circuit.voltageC0

  do {
    const voltageP0 = co.Point(t, voltageC)
    const currentP0 = co.Point(t, currentL)
    const dVoltageC = circuit.dVoltageC_dt(voltageC, currentL) * timeStep
    const dCurrentL = circuit.dCurrentL_dt(voltageC, currentL) * timeStep
    voltageC += dVoltageC
    currentL += dCurrentL
    t += timeStep

    const voltageP1 = co.Point(t, voltageC)
    const currentP1 = co.Point(t, currentL)
    
    path.moveTo(voltageP0.xPixel, voltageP0.yPixel)
    path.lineTo(voltageP1.xPixel, voltageP1.yPixel)

    path.moveTo(currentP0.xPixel, currentP0.yPixel)
    path.lineTo(currentP1.xPixel, currentP1.yPixel)

  } while (t < tMax)

  return path
}