import Coordinate from "../Coordinate/Coordinate"
import { GraphFun } from "./GraphFun"

export interface IFun {
  minX: string | number
  maxX: string | number
  xStep: string | number
  lineWidth: string | number
  f: (x: number) => number
}

export class Fun implements IFun {
  
  minX: number
  maxX: number
  xStep: number
  lineWidth: number = 1
  f: (x: number) => number

  static IsValid(fun: IFun): boolean {
    if(!fun) return false
    if(fun.minX === undefined || isNaN(+fun.minX)) return false
    if(fun.maxX === undefined || isNaN(+fun.maxX)) return false
    if(fun.xStep === undefined || isNaN(+fun.xStep)) return false
    if(fun.lineWidth === undefined || isNaN(+fun.lineWidth)) return false
    if(+fun.maxX - +fun.minX < Number.EPSILON) return false
    if(fun.xStep < Number.EPSILON) return false
    return true
  }

  constructor(fun: IFun, f: (x: number) => number) {

    if(!Fun.IsValid(fun)) {
      throw Error("Invalid Function")
    }
    this.minX = +fun.minX
    this.maxX = +fun.maxX
    this.xStep = +fun.xStep
    this.lineWidth = +fun.lineWidth || 1
    this.f = f
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphFun(canvas, coordinate, this)
  }
}