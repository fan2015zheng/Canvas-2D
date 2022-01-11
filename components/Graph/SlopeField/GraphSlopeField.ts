import Coordinate from "../Coordinate/Coordinate"
import { SlopeField }from "./SlopeField"

export function GraphSlopeField(canvas: HTMLCanvasElement, 
  coordinate: Coordinate, slopeField: SlopeField) {
  
  if(!canvas || !coordinate || !slopeField) { return }

  const ctx = canvas.getContext("2d")
  if(!ctx) return

  const needles = NeedlePath(coordinate, slopeField)
  ctx.lineWidth = slopeField.needleWidth
  ctx.stroke(needles)
}

function NeedlePath(coordinate: Coordinate, slopeField: SlopeField): Path2D {
  const co = coordinate
  let path = new Path2D()

  for(let x=co.minX; x<=co.maxX; x=x+slopeField.gap) {
    for(let y=co.minY; y<=co.maxY; y=y+slopeField.gap) {
      const p0 = co.Point(x, y)
      const a = slopeField.f(x,y)
      const b = slopeField.g(x,y)
      const dx = slopeField.needleLength * Cos(a, b)
      const dy = slopeField.needleLength * Sin(a, b)
      const p1 = co.ShiftPoint(p0, dx, dy)
      path.moveTo(p0.xPixel, p0.yPixel)
      path.lineTo(p1.xPixel, p1.yPixel)
    }
  }
  return path
}


function Cos(x: number, y: number) {
  if (x < Number.EPSILON && x > -Number.EPSILON) return 0
  return x / Math.sqrt(x*x + y*y)
}

function Sin(x: number, y: number) {
  if (y < Number.EPSILON && y > -Number.EPSILON) return 0
  return y / Math.sqrt(x*x + y*y)
}
