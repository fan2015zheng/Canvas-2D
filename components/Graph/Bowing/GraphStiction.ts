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
  const p0 = co.Point(0, st.y0)
  const p1 = co.Point(st.x1, st.y1)
  const p2 = co.Point(st.x2, st.y2)

  const p3 = co.Point(0, -st.y0)
  const p4 = co.Point(-st.x1, -st.y1)
  const p5 = co.Point(-st.x2, -st.y2)

  path.arc(origin.xPixel, origin.yPixel, stiction.lineWidth,0,2*Math.PI)
  path.moveTo(p0.xPixel, p0.yPixel)
  path.lineTo(p1.xPixel, p1.yPixel)
  path.lineTo(p2.xPixel, p2.yPixel)

  path.moveTo(p3.xPixel, p3.yPixel)
  path.lineTo(p4.xPixel, p4.yPixel)
  path.lineTo(p5.xPixel, p5.yPixel)

  return path
}