import Coordinate from "../Coordinate/Coordinate"
import {TunnelDiodeCircuit} from "./TunnelDiodeCircuit"

export function GraphTunnelDiodeCircuit(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, circuit: TunnelDiodeCircuit) {
  
  if(!canvas || !coordinate || !circuit) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const [volatagePath, currentPath] = CircuitPath(coordinate, circuit)
  ctx.lineWidth = circuit.lineWidth
  ctx.strokeStyle = "blue"
  ctx.stroke(volatagePath)
  ctx.strokeStyle = "red"
  ctx.stroke(currentPath)
}

function CircuitPath(coordinate: Coordinate, circuit: TunnelDiodeCircuit): [Path2D, Path2D] {
  const co = coordinate
  const voltagePath = new Path2D()
  const currentPath = new Path2D()
  const tMax = co.maxX
  const timeStep = circuit.timeStep
  let t = 0
  let voltageC = circuit.voltageC0
  let currentL = circuit.currentL0
  let voltagePoint = co.Point(0, voltageC)
  let currentPoint = co.Point(0, currentL)
  voltagePath.moveTo(voltagePoint.xPixel, voltagePoint.yPixel)
  currentPath.moveTo(currentPoint.xPixel, currentPoint.yPixel)

  do {
  
    const dVoltageC = circuit.dVoltageC_dt(voltageC, currentL) * timeStep
    const dCurrentL = circuit.dCurrentL_dt(voltageC, currentL) * timeStep
    voltageC += dVoltageC
    currentL += dCurrentL
    t += timeStep

    voltagePoint = co.Point(t, voltageC)
    currentPoint = co.Point(t, currentL)
    
    voltagePath.lineTo(voltagePoint.xPixel, voltagePoint.yPixel)
    currentPath.lineTo(currentPoint.xPixel, currentPoint.yPixel)

  } while (t < tMax)

  return [voltagePath, currentPath]
}