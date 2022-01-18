import Coordinate from "../Coordinate/Coordinate"
import { SlopeField }from "./SlopeField"

export interface ISlopeFieldTrace {
  x0: number
  y0: number
  traceWidth: number
  step: number
  steps: number
  incrementalSteps: number
}

export function GraphSlopeField(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, slopeField: SlopeField, slopeFieldTrace?: ISlopeFieldTrace) {
  
  if(!canvas || !coordinate || !slopeField) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const needles = NeedlePath(coordinate, slopeField, slopeField.needleWidth*1.5)
 
  ctx.lineWidth = slopeField.needleWidth
  ctx.strokeStyle = "gray"
  ctx.stroke(needles)

  if(!slopeFieldTrace) return
  const [trace, lastTrace] = TracePath(coordinate, slopeField, slopeFieldTrace)
  ctx.lineWidth = slopeFieldTrace.traceWidth
  ctx.strokeStyle = "red"
  ctx.stroke(trace)
  ctx.strokeStyle = "gold"
  ctx.stroke(lastTrace)
}

function TracePath(coordinate: Coordinate, slopeField: SlopeField, slopeFieldTrace: ISlopeFieldTrace) {
  const co = coordinate
  let path = new Path2D()
  let lastPath = new Path2D()

  let p = co.Point(slopeFieldTrace.x0, slopeFieldTrace.y0)
  path.arc(p.xPixel, p.yPixel, slopeFieldTrace.traceWidth*1.2, 0, 2*Math.PI)
  path.moveTo(p.xPixel, p.yPixel)
  let drawLastPath = false
  for(let i=0; i<slopeFieldTrace.steps; i++) {
    p = co.ShiftPoint(p, slopeField.f(p.x, p.y)*slopeFieldTrace.step, slopeField.g(p.x, p.y)*slopeFieldTrace.step)
    path.lineTo(p.xPixel, p.yPixel)

    if(drawLastPath) {
      lastPath.lineTo(p.xPixel, p.yPixel)
    }

    if(!drawLastPath && slopeFieldTrace.steps - i < slopeFieldTrace.incrementalSteps) {
      lastPath.moveTo(p.xPixel, p.yPixel)
      drawLastPath = true
    }

  }
  return [path, lastPath]
}

function NeedlePath(coordinate: Coordinate, slopeField: SlopeField, radius: number): Path2D {
  const co = coordinate
  let path = new Path2D()

  for(let x=co.minX; x<=co.maxX; x=x+slopeField.gap) {
    for(let y=co.minY; y<=co.maxY; y=y+slopeField.gap) {
      const p0 = co.Point(x, y)
      const a = slopeField.f(x,y)
      const b = slopeField.g(x,y)
      const dx = slopeField.needleLength * Cos(a, b)
      const dy = slopeField.needleLength * Sin(a, b)
      const p1 = co.ShiftPoint(p0, dx, dy)
      path.moveTo(p0.xPixel, p0.yPixel)
      path.lineTo(p1.xPixel, p1.yPixel)
      path.moveTo(p0.xPixel, p0.yPixel)
      path.arc(p0.xPixel, p0.yPixel, radius, 0 , 2*Math.PI)
    }
  }
  return path
}


export function Cos(x: number, y: number) {
  if (x < Number.EPSILON && x > -Number.EPSILON) return 0
  return x / Math.sqrt(x*x + y*y)
}

export function Sin(x: number, y: number) {
  if (y < Number.EPSILON && y > -Number.EPSILON) return 0
  return y / Math.sqrt(x*x + y*y)
}
