import Coordinate from "../Coordinate/Coordinate"
import {Bowing} from "./Bowing"

export function GraphBowing(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, bow: Bowing) {
  
  if(!canvas || !coordinate || !bow) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const [xPath, vPath] = BowPath(coordinate, bow)
  ctx.lineWidth = bow.lineWidth
  ctx.strokeStyle = "blue"
  ctx.stroke(xPath)
  ctx.strokeStyle = "red"
  ctx.stroke(vPath)
}

function BowPath(coordinate: Coordinate, bow: Bowing): [Path2D, Path2D] {
  const co = coordinate
  const xPath = new Path2D()
  const vPath = new Path2D()
  const tMax = bow.useTimeSteps? Math.min(co.maxX, bow.timeSteps * bow.timeStep) : co.maxX

  const timeStep = bow.timeStep
  let t = 0
  let x = bow.x0
  let v = bow.v0
  let xPoint = co.Point(0, x)
  let vPoint = co.Point(0, v)
  xPath.moveTo(xPoint.xPixel, xPoint.yPixel)
  vPath.moveTo(vPoint.xPixel, vPoint.yPixel)

  do {
  
    const dx = bow.dx_dt(v) * timeStep
    const dv = bow.dv_dt(x, v) * timeStep
    x += dx
    v += dv
    t += timeStep

    xPoint = co.Point(t, x)
    vPoint = co.Point(t, v)
    
    xPath.lineTo(xPoint.xPixel, xPoint.yPixel)
    vPath.lineTo(vPoint.xPixel, vPoint.yPixel)

  } while (t < tMax)

  return [xPath, vPath]
}