import Coordinate from "../Coordinate/Coordinate"
import LogisticMap from "./LogisticMap"

export function GraphLogisticMap(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, logisticMapParam: LogisticMap) {
  
  if(!canvas || !coordinate) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const points = DataPoints(coordinate, logisticMapParam)
  ctx.fill(points)
}

function DataPoints(coordinate: Coordinate, logisticMapParam: LogisticMap) {
  const co = coordinate
  let points = new Path2D()
  
  let y0 = logisticMapParam.x0
  const p0 = co.Point(0,y0)
  points.arc(p0.xPixel, p0.yPixel, Math.max(logisticMapParam.pointRadius,2), 0, 2*Math.PI)

  const endX = Math.round(co.maxX)
  let y = y0
  for(let x=1; x<=endX; x++) {
    y = logisticMapParam.f(y)
    const p = co.Point(x, y)
    points.arc(p.xPixel, p.yPixel, logisticMapParam.pointRadius, 0, 2*Math.PI)
   
    points.moveTo(0,0)
  }
  return points
}