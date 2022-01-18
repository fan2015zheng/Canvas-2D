import Coordinate from "../Coordinate/Coordinate"
import {ClosedCurve} from "./ClosedCurve"

export function GraphClosedCurve(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, curve: ClosedCurve) {
  
  if(!canvas || !coordinate || !curve) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const path = CurvePath(coordinate, curve)
  ctx.lineWidth = curve.lineWidth
  ctx.stroke(path)
}

function CurvePath(coordinate: Coordinate, curve: ClosedCurve) {
  const co = coordinate
  const path = new Path2D()

  const points = curve.points
  const point0 = points[0]
  const p0 = co.Point(point0.x, point0.y)
  path.moveTo(p0.xPixel, p0.yPixel)

  for(let i=1; i<points.length; i++) {
    const point =  points[i]
    const p = co.Point(point.x, point.y)
    path.lineTo(p.xPixel, p.yPixel)
  }
  path.lineTo(p0.xPixel, p0.yPixel)

  return path
}