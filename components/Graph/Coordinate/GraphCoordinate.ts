import Coordinate from "./Coordinate"

export function GraphCoordinate(canvas: HTMLCanvasElement, 
  coordinate: Coordinate) {
  
  if(!canvas || !coordinate) { return }

  if(!coordinate.maxPixelX) return
  if(!coordinate.maxPixelY) return

  canvas.width = coordinate.maxPixelX
  canvas.height = coordinate.maxPixelY

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const mesh = MeshPath(coordinate)

  ctx.lineWidth = 0.5
  ctx.strokeStyle = "tan"
  ctx.stroke(mesh)

  ctx.lineWidth = 1
  ctx.strokeStyle = "#666"
  ctx.font = "12px Monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  const axis = Axis(ctx, coordinate)
  ctx.stroke(axis)
}

function Text(num: number) {
  // Avoid 1.999999999999 etc
  return (Math.round(num * 1000000) / 1000000)+""
}

function Axis(ctx: CanvasRenderingContext2D, coordinate: Coordinate) {
  const co = coordinate
  let axis = new Path2D()
  const origin = co.Point(co.originX, co.originY)

  // x-axix
  const p1 = co.Point(co.minX, origin.y)
  const p2 = co.Point(co.maxX, origin.y)
  axis.moveTo(p1.xPixel, p1.yPixel)
  axis.lineTo(p2.xPixel, p2.yPixel)

  // y-axix
  const p3 = co.Point(origin.x, co.minY)
  const p4 = co.Point(origin.x, co.maxY)
  axis.moveTo(p3.xPixel, p3.yPixel)
  axis.lineTo(p4.xPixel, p4.yPixel)
  
  let p = co.ShiftPoint(origin, co.xLabelGap, 0)

  while (p.x < co.maxX && co.xLabelGap > 0) {
    axis.moveTo(p.xPixel, p.yPixel)
    axis.lineTo(p.xPixel, p.yPixel + 10)
    ctx.strokeText(Text(p.x), p.xPixel, p.yPixel + 20)
    p = co.ShiftPoint(p, co.xLabelGap, 0)
  }
  p = co.ShiftPoint(origin, -co.xLabelGap, 0)
  while (p.x > co.minX && co.xLabelGap > 0) {
    axis.moveTo(p.xPixel, p.yPixel)
    axis.lineTo(p.xPixel, p.yPixel + 10)
    ctx.strokeText(Text(p.x), p.xPixel, p.yPixel + 20)
    p = co.ShiftPoint(p, -co.xLabelGap, 0)
  }

  p = co.ShiftPoint(origin, 0, co.yLabelGap)
  while (p.y < co.maxY && co.yLabelGap > 0) {
    axis.moveTo(p.xPixel, p.yPixel)
    axis.lineTo(p.xPixel - 10, p.yPixel)
    ctx.strokeText(Text(p.y), p.xPixel - 25, p.yPixel)
    p = co.ShiftPoint(p, 0, co.yLabelGap)
  }
  p = co.ShiftPoint(origin, 0, -co.yLabelGap)
  while (p.y > co.minY && co.yLabelGap > 0) {
    axis.moveTo(p.xPixel, p.yPixel)
    axis.lineTo(p.xPixel - 10, p.yPixel)
    ctx.strokeText(Text(p.y), p.xPixel - 25, p.yPixel)
    p = co.ShiftPoint(p, 0, -co.yLabelGap)
  }

  return axis
}

function  MeshPath(coordinate: Coordinate) {
  const co = coordinate
  let mesh = new Path2D()

  for(let x=co.minX; x <= co.maxX; x += co.xLabelGap/co.xRulePerLabel ) {
 
    const p1 = co.Point(x, co.minY)
    const p2 = co.Point(x, co.maxY)
    mesh.moveTo(p1.xPixel, p1.yPixel)
    mesh.lineTo(p2.xPixel, p2.yPixel)
    mesh = new Path2D(mesh)
  }

  for(let y=co.minY; y <= co.maxY; y += co.yLabelGap/co.yRulePerLabel) {
    const p1 = co.Point(co.minX, y)
    const p2 = co.Point(co.maxX, y)
    mesh.moveTo(p1.xPixel, p1.yPixel)
    mesh.lineTo(p2.xPixel, p2.yPixel)
    mesh = new Path2D(mesh)
  }

  return mesh
}