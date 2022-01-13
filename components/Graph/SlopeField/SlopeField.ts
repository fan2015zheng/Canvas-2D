import Coordinate from "../Coordinate/Coordinate"
import { GraphSlopeField } from "./GraphSlopeField"

export interface ISlopeFieldRaw {
  needleLength: string | number
  needleWidth: string | number
  gap: string | number
  x0: string | number
  y0: string | number
  timeStep: string | number
  steps: string | number
  incrementalSteps: string | number
  traceWidth: string | number
}

export type xyFun = (x: number, y: number) => number

export class SlopeField implements ISlopeFieldRaw {
  
  needleLength: number
  needleWidth: number
  gap: number
  x0: number
  y0: number
  timeStep: number
  steps: number
  incrementalSteps: number
  traceWidth: number
  f: xyFun
  g: xyFun

  static IsValid(sf: ISlopeFieldRaw): boolean {
    if(!sf) return false
    if(sf.needleLength < Number.EPSILON) return false
    if(sf.needleWidth < Number.EPSILON) return false
    if(sf.gap < Number.EPSILON) return false
    if(sf.timeStep < Number.EPSILON) return false
    if(sf.steps < 0) return false
    if(sf.traceWidth < Number.EPSILON) return false
    if(sf.incrementalSteps < 1) return false

    return true
  }

  constructor(sf: ISlopeFieldRaw, f: xyFun, g: xyFun) {

    if(!SlopeField.IsValid(sf)) {
      throw Error("Invalid Slope Field")
    }
    this.needleLength = +sf.needleLength
    this.needleWidth = +sf.needleWidth
    this.gap = +sf.gap
    this.x0 = +sf.x0
    this.y0 = +sf.y0
    this.timeStep = +sf.timeStep
    this.steps = +sf.steps || 0
    this.traceWidth = +sf.traceWidth
    this.incrementalSteps = +sf.incrementalSteps
    this.f = f
    this.g = g
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphSlopeField(canvas, coordinate, this)
  }
}