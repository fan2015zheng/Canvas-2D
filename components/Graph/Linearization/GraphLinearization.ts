import Coordinate from "../Coordinate/Coordinate"
import { xyFun } from "../SlopeField/SlopeField"
import {Linearization} from "./Linearization"

export function GraphLinearization(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, linearization: Linearization, linear: boolean) {
  
  if(!canvas || !coordinate || !linearization) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const [path0, path1, path2] = LinearizationPaths(coordinate, linearization, linear)
  ctx.lineWidth = linearization.lineWidth
  ctx.strokeStyle = "black"
  if(path0) ctx.stroke(path0)

  ctx.strokeStyle = "blue"
  if(path1) ctx.stroke(path1)

  ctx.strokeStyle = "red"
  if(path2) ctx.stroke(path2)
}

function LinearizationPaths(coordinate: Coordinate, linearization: Linearization, linear: boolean) {
  const path0 = TracePath(coordinate, linearization, 0, linear) 
  
  let path1 = null
  if(!linearization.x1 || !linearization.y1) {
    path1 = TracePath(coordinate, linearization, 1, linear) 
  }
  let path2 = null
  if(!linearization.x2 || !linearization.y2) {
    path2 = TracePath(coordinate, linearization, 2, linear) 
  }
  return [path0, path1, path2]
}

function TracePath(
  coordinate: Coordinate, linearization: Linearization,
  num: number, linear: boolean
) {
  const co = coordinate
  const path = new Path2D()
  let initX = 0
  let initY = 0
  switch(num) {
    case 0:
      initX = linearization.x0
      initX = linearization.y0
      break
    case 1:
      initX = linearization.x1
      initY = linearization.y1
      break
    case 2:
      initX = linearization.x2
      initY = linearization.y2
      break
  }
  let p = co.Point(initX, initY) 
  path.moveTo(p.xPixel, p.yPixel)

  const dx_dt = linear ? linearization.dx_dtLinear : linearization.dx_dt
  const dy_dt = linear ? linearization.dy_dtLinear : linearization.dy_dt

  let x = initX
  let y = initY
  for(let i=0; i<linearization.timeSteps; i++) {
    const dx = dx_dt(x, y) * linearization.timeStep
    const dy = dy_dt(x, y) * linearization.timeStep
    x = x + dx
    y = y + dy
    let p = co.Point(x, y)
    path.lineTo(p.xPixel, p.yPixel)
  }
  

  return path
}