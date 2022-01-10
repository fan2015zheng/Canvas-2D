import Coordinate from "../Coordinate/Coordinate"
import { GraphLogisticMap } from "./GraphLogisticMap"

export interface ILogisticMapRaw {
  h?: string | number
  x0?: string | number
  pointRadius?: string | number
}

export default class LogisticMap implements ILogisticMapRaw {
  h: number
  x0: number
  pointRadius: number
  f: (x: number)=>number

  static IsValid(lm: ILogisticMapRaw) {
    if(!lm) return false
    if(lm.h === undefined || isNaN(+lm.h)) return false
    if(lm.x0 === undefined || isNaN(+lm.x0)) return false
    if(lm.pointRadius === undefined || isNaN(+lm.pointRadius)) return false
    if(lm.h<0 || lm.h>4) return false
    if(lm.x0<0 || lm.x0>1) return false
    if(lm.pointRadius < Number.EPSILON) return false
    return true
  }

  constructor(lm: ILogisticMapRaw) {
    if(!LogisticMap.IsValid(lm)) {
      throw Error("Invalid Logistic Map")
    }
    this.h = +lm.h!
    this.x0 = +lm.x0!
    this.f = (x: number)=> +lm.h!*x*(1-x)
    this.pointRadius = +lm.pointRadius!
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphLogisticMap(canvas, coordinate, this)
  }
}