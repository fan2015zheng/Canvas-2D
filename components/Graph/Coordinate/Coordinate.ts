import { GraphCoordinate } from "./GraphCoordinate"

export class CoordinateRaw {
  maxPixelX: number | string = ""
  maxPixelY: number | string = ""
  maxX: number | string = ""
  maxY: number | string = ""
  minX: number | string = ""
  minY: number | string = ""
  originX: number | string = ""
  originY: number | string = ""
  xLabelGap: number | string = ""
  yLabelGap: number | string = ""
  xRulePerLabel: number | string = ""
  yRulePerLabel: number | string = ""
}

export default class Coordinate {

  maxPixelX?: number
  maxPixelY?: number
  maxX?: number
  maxY?: number
  minX?: number
  minY?: number
  originX?: number
  originY?: number
  xLabelGap?: number
  yLabelGap?: number
  xRulePerLabel?: number
  yRulePerLabel?: number
  
  xFun?: (pixelX: number) => number
  yFun?: (pixelY: number) => number
  xInvFun?: (x: number) => number 
  yInvFun?: (y: number) => number

  IsValid() {
    return IsCoordinateValid(
      this.maxPixelX, this.maxPixelY, this.maxX, this.maxY,this.minX, this.minY, 
      this.xLabelGap, this.yLabelGap, this.xRulePerLabel, this.yRulePerLabel
    )
  }

  constructor(maxPixelX?: number, maxPixelY?: number, maxX?: number, maxY?: number, 
    minX?: number, minY?: number, originX?: number, originY?: number, 
    xLabelGap?: number, yLabelGap?: number, xRulePerLabel?: number, yRulePerLabel?: number
  ) {

    if(IsCoordinateValid(maxPixelX, maxPixelY, maxX, maxY, minX, minY, 
      xLabelGap, yLabelGap, xRulePerLabel, yRulePerLabel)) {

        this.maxPixelX = +maxPixelX!
        this.maxPixelY = +maxPixelY!
        this.maxX = +maxX!
        this.maxY = +maxY!
        this.minX = +minX!
        this.minY = +minY!
        this.originX = +originX!
        this.originY = +originY!
        this.xLabelGap = +xLabelGap!
        this.yLabelGap = +yLabelGap!
        this.xRulePerLabel = +xRulePerLabel!
        this.yRulePerLabel = +yRulePerLabel!

        this.xFun = (pixelX: number) => pixelX * (maxX! - minX!) / maxPixelX! + minX!
        this.yFun = (pixelY: number) => pixelY * (minY! - maxY!) / maxPixelY! + maxY!
        this.xInvFun = (x) => (x - minX!) * maxPixelX! / (maxX! - minX!)
        this.yInvFun = (y) => (y - maxY!) * maxPixelY! / (minY! - maxY!)
    }
  }

  Copy(): Coordinate {
    return new Coordinate(this.maxPixelX, this.maxPixelY,
      this.maxX, this.maxY, this.minX, this.minY, this.originX, this.originY,
      this.xLabelGap, this.yLabelGap, this.xRulePerLabel, this.yRulePerLabel)
  }

  Point(x: number, y: number): IPoint {
    return {
      x, y,
      xPixel: this.xInvFun?(x) : undefined,
      yPixel: this.yInvFun?(y) : undefined
    }
  }

  ShiftPoint(point: IPoint, dx: number, dy: number) {
    const x = point.x + dx
    const y = point.y + dy
    return this.Point(x, y)
  }

  Draw(canvas: HTMLCanvasElement) {
    GraphCoordinate(canvas, this)
  }
}

export function IsCoordinateValid(
  maxPixelX?: number,
  maxPixelY?: number,
  maxX?: number,
  maxY?: number,
  minX?: number,
  minY?: number,
  xLabelGap?: number,
  yLabelGap?: number,
  xRulePerLabel?: number,
  yRulePerLabel?: number
): boolean {
  if(maxPixelX === undefined || isNaN(maxPixelX)) return false
  if(maxPixelY === undefined  || isNaN(maxPixelY)) return false
  if(maxX === undefined  || isNaN(maxX)) return false
  if(maxY === undefined  || isNaN(maxY)) return false
  if(minX === undefined  || isNaN(minX)) return false
  if(minY === undefined  || isNaN(minY)) return false
  if(xLabelGap === undefined  || isNaN(xLabelGap)) return false
  if(yLabelGap === undefined  || isNaN(yLabelGap)) return false
  if(xRulePerLabel === undefined  || isNaN(xRulePerLabel)) return false
  if(yRulePerLabel === undefined  || isNaN(yRulePerLabel)) return false

  if(maxPixelX < 1) return false
  if(maxPixelY < 1) return false
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
  xPixel?: number,
  yPixel?: number
}