import Coordinate from "./Cooridnate"

export function Graph(canvas: HTMLCanvasElement) {
  
  if(!canvas) { return }

  const ctx = canvas.getContext("2d")
  const coordinate = new Coordinate(canvas.width, canvas.height, 1000, 5, 0, -5)

  const mesh = MeshPath(coordinate, 50, 50)

  ctx.lineWidth = 0.5
  ctx.stroke(mesh)

}

export function  MeshPath(coordinate: Coordinate, xIntervalPixel: number, yIntervalPixel: number) {
  
  if(yIntervalPixel === undefined) {
    yIntervalPixel = xIntervalPixel
  }
  const co = coordinate
  let mesh = new Path2D()

  for(let x=co.minX; x <= co.maxX; x += co.xLen(xIntervalPixel)) {
    const p1 = co.Point(x, co.minY)
    const p2 = co.Point(x, co.maxY)
    mesh.moveTo(p1.xPixel, p1.yPixel)
    mesh.lineTo(p2.xPixel, p2.yPixel)
    mesh = new Path2D(mesh)
  }
  for(let y=co.minY; y <= co.maxY; y += co.yLen(yIntervalPixel)) {
    const p1 = co.Point(co.minX, y)
    const p2 = co.Point(co.maxX, y)
    mesh.moveTo(p1.xPixel, p1.yPixel)
    mesh.lineTo(p2.xPixel, p2.yPixel)
    mesh = new Path2D(mesh)
  }

  return mesh
}