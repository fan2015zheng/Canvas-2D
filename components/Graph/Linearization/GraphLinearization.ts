import Coordinate from "../Coordinate/Coordinate"
import {Linearization} from "./Linearization"

export function GraphLinearization(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, linearization: Linearization, linear: boolean) {
  
  if(!canvas || !coordinate || !linearization) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const [path0, path1, path2, path3] = LinearizationPaths(coordinate, linearization, linear)
  ctx.lineWidth = linearization.lineWidth
  if(path0) {
    ctx.strokeStyle = "#666"
    ctx.stroke(path0)
  }

  if(path1) {
    ctx.strokeStyle = "#4267B2"
    ctx.stroke(path1)
  }
  if(path2) {
    ctx.strokeStyle = "#c4302b"
    ctx.stroke(path2)
  }
  if(path3) {
    ctx.strokeStyle = "limegreen"
    ctx.stroke(path3)
  }
}

function LinearizationPaths(coordinate: Coordinate, linearization: Linearization, linear: boolean) {
  const path0 = TracePath(coordinate, linearization, 0, linear) 
  
  let path1 = null
  if(linearization.x1 || linearization.y1) {
    path1 = TracePath(coordinate, linearization, 1, linear) 
  }
  let path2 = null
  if(linearization.x2 || linearization.y2) {
    path2 = TracePath(coordinate, linearization, 2, linear) 
  }
  let path3 = null
  if(linearization.x3 || linearization.y3) {
    path3 = TracePath(coordinate, linearization, 3, linear) 
  }
  return [path0, path1, path2, path3]
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
      initY = linearization.y0
      break
    case 1:
      initX = linearization.x1
      initY = linearization.y1
      break
    case 2:
      initX = linearization.x2
      initY = linearization.y2
      break
    case 3:
      initX = linearization.x3
      initY = linearization.y3
      break
  }
  const p0 = co.Point(initX, initY)
  path.moveTo(p0.xPixel, p0.yPixel)

  const dx_dt = linear ? linearization.dx_dtLinear : linearization.dx_dt
  const dy_dt = linear ? linearization.dy_dtLinear : linearization.dy_dt

  let x = initX
  let y = initY
  for(let i=0; i<linearization.timeSteps; i++) {
    const dx = dx_dt(x, y) * linearization.timeStep
    const dy = dy_dt(x, y) * linearization.timeStep
    x = x + dx
    y = y + dy
    const p = co.Point(x, y)
    path.lineTo(p.xPixel, p.yPixel)
  }

  // go backward time
  path.moveTo(p0.xPixel, p0.yPixel)
  x = initX
  y = initY
  for(let i=0; i<linearization.timeSteps; i++) {
    const dx = dx_dt(x, y) * -linearization.timeStep
    const dy = dy_dt(x, y) * -linearization.timeStep
    x = x + dx
    y = y + dy
    const p = co.Point(x, y)
    path.lineTo(p.xPixel, p.yPixel)
  }
  

  return path
}