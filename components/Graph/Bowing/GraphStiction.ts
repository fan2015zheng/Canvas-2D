import Coordinate from "../Coordinate/Coordinate"
import {Stiction} from "./Stiction"

export function GraphStiction(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, stiction: Stiction) {
  
  if(!canvas || !coordinate || !stiction) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const path = StictionPath(coordinate, stiction)
  ctx.lineWidth = stiction.lineWidth
  ctx.stroke(path)
}

function StictionPath(coordinate: Coordinate, stiction: Stiction) {
  const co = coordinate
  const st = stiction
  const path = new Path2D()

  const origin = co.Point(0,0)
  path.arc(origin.xPixel, origin.yPixel, stiction.lineWidth,0,2*Math.PI)


  let p0 = co.Point(0, stiction.y0)
  path.moveTo(p0.xPixel, p0.yPixel)

  for(let x=stiction.step; x<=co.maxX; x+=stiction.step) {
    const p = co.Point(x, stiction.f(x))
    path.lineTo(p.xPixel, p.yPixel)
  }

  p0 = co.Point(0, -stiction.y0)
  path.moveTo(p0.xPixel, p0.yPixel)
  for(let x=-stiction.step; x>=co.minX; x-=stiction.step) {
    const p = co.Point(x, stiction.f(x))
    path.lineTo(p.xPixel, p.yPixel)
  }

  return path
}