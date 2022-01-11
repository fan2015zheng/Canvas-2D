import Coordinate from "../Coordinate/Coordinate"
import {TunnelDiode} from "./TunnelDiode"

export function GraphTunnelDiode(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, tunnelDiode: TunnelDiode) {
  
  if(!canvas || !coordinate || !tunnelDiode) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const path = TunnelDiodePath(coordinate, tunnelDiode)
  ctx.lineWidth = tunnelDiode.lineWidth
  ctx.stroke(path)
}

function TunnelDiodePath(coordinate: Coordinate, tunnelDiode: TunnelDiode) {
  const co = coordinate
  const di = tunnelDiode
  const path = new Path2D()

  const p0 = co.Point(0,0)
  const p1 = co.Point(di.x1, di.y1)
  const p2 = co.Point(di.x2, di.y2)
  const p3 = co.Point(di.x3, di.y3)

  path.moveTo(p0.xPixel, p0.yPixel)
  path.lineTo(p1.xPixel, p1.yPixel)
  path.lineTo(p2.xPixel, p2.yPixel)
  path.lineTo(p3.xPixel, p3.yPixel)

  return path
}

export function GraphERLine(canvas: HTMLCanvasElement, coordinate: Coordinate, E: number, R: number) {
  
  if(!canvas || !coordinate) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return
  
  const co = coordinate
  const path =new Path2D()
  const p0 = co.Point(0, E/R)
  const p1 = co.Point(E, 0)
  
  path.moveTo(p0.xPixel, p0.yPixel)
  path.lineTo(p1.xPixel, p1.yPixel)

  ctx.strokeStyle = "red"
  ctx.stroke(path)
}