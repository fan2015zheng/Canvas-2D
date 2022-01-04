
export default class Coordinate {

  maxPixelX: number = 800
  maxPixelY: number = 400
  maxX: number = 50
  maxY: number = 1.05
  minX: number = -10
  minY: number = -0.1
  originX: number = 0
  originY: number = 0
  xLabelGap: number = 10
  yLabelGap: number = 0.1
  xRulePerLabel: number = 2
  yRulePerLabel: number = 2
  
  xFun: (pixelX: number) => number = 
    (pixelX: number) => pixelX * (this.maxX - this.minX) / this.maxPixelX + this.minX
  yFun: (pixelY: number) => number = 
    (pixelY: number) => pixelY * (this.minY - this.maxY) / this.maxPixelY + this.maxY
  xInvFun: (x: number) => number = 
    (x) => (x - this.minX) * this.maxPixelX / (this.maxX - this.minX)
  yInvFun: (y: number) => number = 
    (y) => (y - this.maxY) * this.maxPixelY / (this.minY - this.maxY)


  IsValid() {
    return IsCoordinateValid(
      this.maxPixelY, this.maxPixelY, this.maxX, this.maxY,this.minX, this.minY, 
      this.xLabelGap, this.yLabelGap, this.xRulePerLabel, this.yRulePerLabel
    )
  }

  constructor(maxPixelX: number, maxPixelY: number, maxX: number, maxY: number, 
    minX: number, minY: number, originX: number, originY: number, 
    xLabelGap: number, yLabelGap: number, xRulePerLabel: number =2, yRulePerLabel: number = 2
  ) {

    if(!IsCoordinateValid(maxPixelX, maxPixelY, maxX, maxY, minX, minY, 
      xLabelGap, yLabelGap, xRulePerLabel, yRulePerLabel)) {
        return
    }


    this.xFun = (pixelX: number) => pixelX * (maxX - minX) / maxPixelX + minX
    this.yFun = (pixelY: number) => pixelY * (minY - maxY) / maxPixelY + maxY
    this.xInvFun = (x) => (x - minX) * maxPixelX / (maxX - minX)
    this.yInvFun = (y) => (y - maxY) * maxPixelY / (minY - maxY)

    this.maxPixelX = +maxPixelX
    this.maxPixelY = +maxPixelY
    this.maxX = +maxX
    this.maxY = +maxY
    this.minX = +minX
    this.minY = +minY
    this.originX = +originX
    this.originY = +originY
    this.xLabelGap = +xLabelGap
    this.yLabelGap = +yLabelGap
    this.xRulePerLabel = +xRulePerLabel
    this.yRulePerLabel = +yRulePerLabel
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
}

export function IsCoordinateValid(
  maxPixelX: number,
  maxPixelY: number,
  maxX: number,
  maxY: number,
  minX: number,
  minY: number,
  xLabelGap: number,
  yLabelGap: number,
  xRulePerLabel: number,
  yRulePerLabel: number
): boolean {
  if(maxPixelX < 100) return false
  if(maxPixelY < 100) return false
  if(xLabelGap < Number.EPSILON) return false
  if(yLabelGap < Number.EPSILON) return false
  if(maxX - minX < Number.EPSILON) return false
  if(maxY - minY < Number.EPSILON) return false
  if(xRulePerLabel < 1) return false
  if(yRulePerLabel < 1) return false
  return true
}

interface IPoint {
  x: number,
  y: number,
  xPixel: number,
  yPixel: number
}