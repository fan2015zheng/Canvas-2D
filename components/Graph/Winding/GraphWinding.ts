import Coordinate from "../Coordinate/Coordinate"
import { Cos, Sin } from "../SlopeField/GraphSlopeField"
import {Winding} from "./Winding"

export function GraphWinding(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, winding: Winding) {
  
  if(!canvas || !coordinate || !winding) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const path = WindingPath(coordinate, winding)
  ctx.lineWidth = winding.arrowWidth
  ctx.strokeStyle = "cornflowerBlue"
  ctx.stroke(path)
}

function WindingPath(coordinate: Coordinate, winding: Winding) {
  const co = coordinate
  const path = new Path2D()

  const curve = winding.closedCurve
  const point0 = curve.f(winding.curveSteps)

  const a = winding.dx_dt(point0.x, point0.y)
  const b = winding.dy_dt(point0.x, point0.y)

  const x1 = winding.arrowLength * Cos(a,b)
  const y1 = winding.arrowLength * Sin(a,b)
 
  const p0 = co.Point(point0.x, point0.y) 
  const p1 = co.ShiftPoint(p0, x1, y1)
  
  path.arc(p0.xPixel, p0.yPixel, winding.arrowWidth*0.5,0, 2*Math.PI)
  path.moveTo(p0.xPixel, p0.yPixel)
  path.lineTo(p1.xPixel, p1.yPixel)
  return path
}