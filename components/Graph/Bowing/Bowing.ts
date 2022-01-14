import Coordinate from "../Coordinate/Coordinate"
import { GraphBowing } from "./GraphBowing"
import { Stiction } from "./Stiction"

export interface IBowingRaw {
  M: string | number
  k: string | number
  b: string | number
  lineWidth: string| number
  timeStep: string | number
  timeSteps: string | number
  x0: string | number
  v0: string | number
  phaseLineWidth: string | number
  incrementalSteps: string | number
  useTimeSteps: boolean
}

export class Bowing implements IBowingRaw {
  M: number
  k: number
  b: number
  lineWidth: number = 1
  timeStep: number
  x0: number
  v0: number
  timeSteps: number
  phaseLineWidth: number
  incrementalSteps: number
  useTimeSteps: boolean
  stiction: Stiction
  dx_dt: (v: number) => number
  dv_dt: (x: number, v: number) => number

  static IsValid(bow: IBowingRaw) {
    if(!bow) return false
    if(bow.M === undefined || isNaN(+bow.M)) return false
    if(bow.k === undefined || isNaN(+bow.k)) return false
    if(bow.b === undefined || isNaN(+bow.b)) return false
    if(bow.lineWidth === undefined || isNaN(+bow.lineWidth)) return false
    if(bow.timeStep === undefined || isNaN(+bow.timeStep)) return false
    if(bow.x0 === undefined || isNaN(+bow.x0)) return false
    if(bow.v0 === undefined || isNaN(+bow.v0)) return false

    if(bow.M < Number.EPSILON) return false
    if(bow.k < Number.EPSILON) return false
    if(bow.lineWidth < Number.EPSILON) return false
    if(bow.timeStep < Number.EPSILON) return false
    if(bow.timeSteps < 0) return false
    if(bow.phaseLineWidth < Number.EPSILON) return false
    if(bow.incrementalSteps < 1) return false

    return true
  }

  constructor(bow: IBowingRaw, stiction: Stiction) {
    if(!Bowing.IsValid(bow)) {
      throw Error("Invalid Bowing parameters")
    }
    this.M = +bow.M
    this.k = +bow.k
    this.b = +bow.b
    this.lineWidth = +bow.lineWidth || 1
    this.timeStep = +bow.timeStep
    this.timeSteps = +bow.timeSteps
    this.x0 = +bow.x0
    this.v0 = +bow.v0
    this.phaseLineWidth = +bow.phaseLineWidth
    this.incrementalSteps = +bow.incrementalSteps
    this.useTimeSteps = bow.useTimeSteps

    this.stiction = stiction
    this.dx_dt = (v: number) => {
      return v
    }
  
    this.dv_dt = (x: number, v: number) => {
      return (-this.k * x - stiction.f(v - this.b))/this.M
    }
  }


  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphBowing(canvas, coordinate, this)
  }
}