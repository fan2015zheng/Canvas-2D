import Coordinate from "../Coordinate/Coordinate"
import { GraphLogisticMap } from "./GraphLogisticMap"

export default class LogisticMap {
  h?: number
  x0?: number
  f?: (x: number)=>number
  pointRadius?: number = 3

  IsValid() {
    return IsLogisticMapValid(this.h, this.x0, this.pointRadius)
  }

  constructor(h?: number, x0?: number, pointRadius?: number) {
    if(!IsLogisticMapValid(h, x0, pointRadius)) {
      return
    }
    this.h = +h!
    this.x0 = +x0!
    this.f = (x: number)=> h!*x*(1-x)
    this.pointRadius = +pointRadius!
  }

  Copy() {
    console.log(this, new LogisticMap(this.h, this.x0, this.pointRadius))
    return new LogisticMap(this.h, this.x0, this.pointRadius)
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphLogisticMap(canvas, coordinate, this)
  }
}

export function IsLogisticMapValid(h?: number, x0?: number, pointRadius?: number) {
  if(h === undefined) return false
  if(x0 === undefined) return false
  if(pointRadius === undefined) return false
  if(h<0 || h>4) return false
  if(x0<0 || x0>1) return false
  if(pointRadius < Number.EPSILON) return false
  return true
}