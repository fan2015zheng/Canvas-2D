import Coordinate from "../Coordinate/Coordinate"
import { GraphStiction } from "./GraphStiction"

export interface IStictionRaw {
  y0: string | number
  x1: string | number
  y1: string | number
  x2: string | number
  y2: string | number
  lineWidth: string | number
}

export class Stiction implements IStictionRaw {
  y0: number
  x1: number
  y1: number
  x2: number
  y2: number
  lineWidth: number = 1
  f: (x: number) => number
  
  static IsValid(stiction: IStictionRaw) {
    if(!stiction) return false
    if(stiction.y0 === undefined || isNaN(+stiction.y0)) return false
    if(stiction.x1 === undefined || isNaN(+stiction.x1)) return false
    if(stiction.x2 === undefined || isNaN(+stiction.x2)) return false
    if(stiction.y1 === undefined || isNaN(+stiction.y1)) return false
    if(stiction.y2 === undefined || isNaN(+stiction.y2)) return false
    if(stiction.lineWidth === undefined || isNaN(+stiction.lineWidth)) return false

    if(stiction.y0 < Number.EPSILON) return false
    if(stiction.x1 < Number.EPSILON) return false
    if(stiction.y1 < Number.EPSILON) return false
    if(+stiction.y1 - +stiction.y0 > -Number.EPSILON) return false
    if(+stiction.x2 - +stiction.x1 < Number.EPSILON) return false
    if(+stiction.y2 - +stiction.y1 < Number.EPSILON) return false
    if(+stiction.lineWidth < Number.EPSILON) return false

    return true
  }

  constructor(stiction: IStictionRaw) {
    if(!Stiction.IsValid(stiction)) {
      throw Error("Invalid Stiction")
    }
    this.y0 = +stiction.y0
    this.x1 = +stiction.x1
    this.x2 = +stiction.x2
    this.y1 = +stiction.y1
    this.y2 = +stiction.y2
    this.lineWidth = +stiction.lineWidth || 1
    this.f = (x: number) => {
      let sign = 1
      if(x<0) {
        sign = -1
        x = -x
      }
      if(x < Number.EPSILON) return 0

      if(x>0 && x<=stiction.x1) {
        return linearFun(0,+stiction.y0, +stiction.x1, +stiction.y1, x)
      }
      if(x>stiction.x1) {
        return linearFun(+stiction.x1, +stiction.y1, +stiction.x2, +stiction.y2, x)
      }
      return 0
    }
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphStiction(canvas, coordinate, this)
  }
}


function linearFun(x1: number, y1: number, x2: number, y2: number, x: number) {
  return (x-x1)*(y2-y1)/(x2-x1)+y1
}