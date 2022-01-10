import { GraphCoordinate } from "./GraphCoordinate"

export interface ICoordinateRaw {
  maxPixelX: string | number
  maxPixelY: string | number
  maxX: string | number
  maxY: string | number
  minX: string | number
  minY: string | number
  originX: string | number
  originY: string | number
  xLabelGap: string | number
  yLabelGap: string | number
  xRulePerLabel: string | number
  yRulePerLabel: string | number
}

export default class Coordinate implements ICoordinateRaw {

  maxPixelX: number
  maxPixelY: number
  maxX: number
  maxY: number
  minX: number
  minY: number
  originX: number
  originY: number
  xLabelGap: number
  yLabelGap: number
  xRulePerLabel: number
  yRulePerLabel: number
  
  xFun: (pixelX: number) => number
  yFun: (pixelY: number) => number
  xInvFun: (x: number) => number 
  yInvFun: (y: number) => number

  static IsValid(co: ICoordinateRaw): boolean {
    if(!co) return false
    if(co.maxPixelX === undefined || isNaN(+co.maxPixelX)) return false
    if(co.maxPixelY === undefined  || isNaN(+co.maxPixelY)) return false
    if(co.maxX === undefined  || isNaN(+co.maxX)) return false
    if(co.maxY === undefined  || isNaN(+co.maxY)) return false
    if(co.minX === undefined  || isNaN(+co.minX)) return false
    if(co.minY === undefined  || isNaN(+co.minY)) return false
    if(co.xLabelGap === undefined  || isNaN(+co.xLabelGap)) return false
    if(co.yLabelGap === undefined  || isNaN(+co.yLabelGap)) return false
    if(co.xRulePerLabel === undefined  || isNaN(+co.xRulePerLabel)) return false
    if(co.yRulePerLabel === undefined  || isNaN(+co.yRulePerLabel)) return false
  
    if(co.maxPixelX < 1) return false
    if(co.maxPixelY < 1) return false
    if(co.xLabelGap < Number.EPSILON) return false
    if(co.yLabelGap < Number.EPSILON) return false
    if(+co.maxX - +co.minX < Number.EPSILON) return false
    if(+co.maxY - +co.minY < Number.EPSILON) return false
    if(co.xRulePerLabel < 1) return false
    if(co.yRulePerLabel < 1) return false
    return true
  }

  constructor(co: ICoordinateRaw) {

    if(!Coordinate.IsValid(co)) {
      throw Error("Invalid Coordinate")
    }

    this.maxPixelX = +co.maxPixelX!
    this.maxPixelY = +co.maxPixelY!
    this.maxX = +co.maxX!
    this.maxY = +co.maxY!
    this.minX = +co.minX!
    this.minY = +co.minY!
    this.originX = +co.originX!
    this.originY = +co.originY!
    this.xLabelGap = +co.xLabelGap!
    this.yLabelGap = +co.yLabelGap!
    this.xRulePerLabel = +co.xRulePerLabel!
    this.yRulePerLabel = +co.yRulePerLabel!

    this.xFun = (pixelX: number) => pixelX * (+co.maxX! - +co.minX!) / +co.maxPixelX! + +co.minX!
    this.yFun = (pixelY: number) => pixelY * (+co.minY! - +co.maxY!) / +co.maxPixelY! + +co.maxY!
    this.xInvFun = (x) => (x - +co.minX!) * +co.maxPixelX! / (+co.maxX! - +co.minX!)
    this.yInvFun = (y) => (y - +co.maxY!) * +co.maxPixelY! / (+co.minY! - +co.maxY!)
    
  }

  Point(x: number, y: number): IPoint {
    return {
      x, 
      y,
      xPixel: this.xInvFun(x),
      yPixel: this.yInvFun(y)
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

interface IPoint {
  x: number,
  y: number,
  xPixel: number,
  yPixel: number
}