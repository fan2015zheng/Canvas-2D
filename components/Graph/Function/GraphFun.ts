import Coordinate from "../Coordinate/Coordinate"
import {Fun} from "./Fun"

export function GraphFun(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, fun: Fun) {
  
  if(!canvas || !coordinate || !fun) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const path = FunPath(coordinate, fun)
  ctx.lineWidth = fun.lineWidth
  ctx.stroke(path)
}

function FunPath(coordinate: Coordinate, fun: Fun) {
  const co = coordinate
  let path = new Path2D()

  const min = Math.max(co.minX, fun.minX)
  const max = Math.min(co.maxX, fun.maxX)

  let x0 = min
  let y0 = fun.f(x0)
  let p0 = co.Point(x0, y0)
  path.moveTo(p0.xPixel, p0.yPixel)
  let x = min
  do {
    x += fun.xStep
    const y = fun.f(x)
    const p = co.Point(x, y)
    path.lineTo(p.xPixel, p.yPixel)
  } while (x <= max)

  return path
}