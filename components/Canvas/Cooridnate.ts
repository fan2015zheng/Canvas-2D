
export default class Coordinate {

  xFun: (pixelX: number) => number
  yFun: (pixelY: number) => number
  xInvFun: (x: number) => number
  yInvFun: (y: number) => number
  maxX: number
  maxY: number
  minX: number
  minY: number
  xRuleGapPixel: number
  yRuleGapPixel: number
  originX: number
  originY: number
  xLabelGap: number
  yLabelGap: number

  constructor(maxPixelX: number, maxPixelY: number, maxX: number, maxY: number, 
    minX: number, minY: number, xRuleGapPixel: number, yRuleGapPixel: number,
    originX: number, originY: number, xLabelGap: number, yLabelGap: number
  ) {
    this.xFun = (pixelX: number) => pixelX * (maxX - minX) / maxPixelX + minX
    this.yFun = (pixelY: number) => pixelY * (minY - maxY) / maxPixelY + maxY
    this.xInvFun = (x) => (x - minX) * maxPixelX / (maxX - minX)
    this.yInvFun = (y) => (y - maxY) * maxPixelY / (minY - maxY)
    this.maxX = maxX
    this.maxY = maxY
    this.minX = minX
    this.minY = minY
    this.xRuleGapPixel = xRuleGapPixel
    this.yRuleGapPixel = yRuleGapPixel
    this.originX = originX
    this.originY = originY
    this.xLabelGap = xLabelGap
    this.yLabelGap = yLabelGap
  }

  Point(x: number, y: number): IPoint {
    return {
      x, y,
      xPixel: this.xInvFun(x),
      yPixel: this.yInvFun(y)
    }
  }

  ShiftPoint(point: IPoint, dx: number, dy: number) {
    const x = point.x + dx
    const y = point.y + dy
    return this.Point(x, y)
  }

  xLen(xLenPixel: number) {
    return this.xFun(xLenPixel) - this.xFun(0)
  }

  yLen(yLenPixel: number) {
    return this.yFun(0) - this.yFun(yLenPixel)
  }
}

interface IPoint {
  x: number,
  y: number,
  xPixel: number,
  yPixel: number
}