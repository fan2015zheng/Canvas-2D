import Coordinate from "../Coordinate/Coordinate"
import {VanDerPol} from "./VanDerPol"

export function GraphVanDerPol(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, vanDerPol: VanDerPol) {
  
  if(!canvas || !coordinate || !vanDerPol) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const [volatagePath, currentPath] = CircuitPath(coordinate, vanDerPol)
  ctx.lineWidth = vanDerPol.lineWidth
  ctx.strokeStyle = "blue"
  ctx.stroke(volatagePath)
  ctx.strokeStyle = "red"
  ctx.stroke(currentPath)
}

function CircuitPath(coordinate: Coordinate, vanDerPol: VanDerPol): [Path2D, Path2D] {
  const co = coordinate
  const voltagePath = new Path2D()
  const currentPath = new Path2D()

  const tMax = vanDerPol.useTimeSteps? Math.min(co.maxX, vanDerPol.timeSteps * vanDerPol.timeStep) : co.maxX
  const timeStep = vanDerPol.timeStep
  let t = 0
  let voltageC = vanDerPol.voltageC0
  let currentL = vanDerPol.currentL0
  let voltagePoint = co.Point(0, voltageC)
  let currentPoint = co.Point(0, currentL)
  voltagePath.moveTo(voltagePoint.xPixel, voltagePoint.yPixel)
  currentPath.moveTo(currentPoint.xPixel, currentPoint.yPixel)

  do {
  
    const dVoltageC = vanDerPol.dVoltageC_dt(voltageC, currentL) * timeStep
    const dCurrentL = vanDerPol.dCurrentL_dt(voltageC) * timeStep
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