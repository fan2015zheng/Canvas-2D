
export default class Coordinate {

  xFun: (pixelX: number) => number
  yFun: (pixelY: number) => number
  xInvFun: (x: number) => number
  yInvFun: (y: number) => number
  maxX: number
  maxY: number
  minX: number
  minY: number

  constructor(maxPixelX: number, maxPixelY: number, maxX: number, maxY: number, 
    minX: number, minY: number) {
    this.xFun = (pixelX: number) => pixelX * (maxX - minX) / maxPixelX + minX
    this.yFun = (pixelY) => pixelY * (maxY - minY) / maxPixelY + minY
    this.xInvFun = (x) => (x - minX) * maxPixelX / (maxX - minX)
    this.yInvFun = (y) => (y - minY) * maxPixelY / (maxY - minY)
    this.maxX = maxX
    this.maxY = maxY
    this.minX = minX
    this.minY = minY
  }

  Point(x: number, y: number): IPoint {
    return {
      x, y,
      xPixel: this.xInvFun(x),
      yPixel: this.yInvFun(y)
    }
  }

  xLen(xLenPixel: number) {
    return this.xFun(xLenPixel) - this.xFun(0)
  }

  yLen(yLenPixel: number) {
    return this.yFun(yLenPixel) - this.yFun(0)
  }
}

interface IPoint {
  x: number,
  y: number,
  xPixel: number,
  yPixel: number
}