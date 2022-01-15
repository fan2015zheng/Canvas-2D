import Coordinate from "../Coordinate/Coordinate"
import { GraphStiction } from "./GraphStiction"

export interface IStictionRaw {
  y0: string | number
  x1: string | number
  y1: string | number
  lineWidth: string | number
  step: string | number
}

export class Stiction implements IStictionRaw {
  y0: number
  x1: number
  y1: number
  lineWidth: number = 1
  step: number
  f: (x: number) => number
  
  static IsValid(stiction: IStictionRaw) {
    if(!stiction) return false
    if(stiction.y0 === undefined || isNaN(+stiction.y0)) return false
    if(stiction.x1 === undefined || isNaN(+stiction.x1)) return false
    if(stiction.y1 === undefined || isNaN(+stiction.y1)) return false
    if(stiction.lineWidth === undefined || isNaN(+stiction.lineWidth)) return false
    if(stiction.step === undefined || isNaN(+stiction.step)) return false

    if(stiction.y0 < Number.EPSILON) return false
    if(stiction.x1 < Number.EPSILON) return false
    if(stiction.y1 < Number.EPSILON) return false
    if(+stiction.y1 - +stiction.y0 > -Number.EPSILON) return false
    if(+stiction.lineWidth < Number.EPSILON) return false
    if(+stiction.step < Number.EPSILON) return false

    return true
  }

  constructor(stiction: IStictionRaw) {
    if(!Stiction.IsValid(stiction)) {
      throw Error("Invalid Stiction")
    }
    this.y0 = +stiction.y0
    this.x1 = +stiction.x1
    this.y1 = +stiction.y1
    this.lineWidth = +stiction.lineWidth || 1
    this.step = +stiction.step

    this.f = (x: number) => {
      let sign = 1
      if(x<0) {
        sign = -1
        x = -x
      }
      if(x < Number.EPSILON) return 0
    
      return sign * quadraticFun(+stiction.y0, +stiction.x1, +stiction.y1, x)
     
      return 0
    }
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphStiction(canvas, coordinate, this)
  }
}

function quadraticFun(y0: number, x1: number, y1: number, x: number) {
  return (x-x1)*(x-x1)*(y0-y1)/(x1*x1) + y1
}