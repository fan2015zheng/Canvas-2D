import Coordinate from "../Coordinate/Coordinate"
import { GraphSlopeField, ISlopeFieldTrace } from "./GraphSlopeField"

export interface ISlopeFieldRaw {
  needleLength: string | number
  needleWidth: string | number
  gap: string | number
}

export type xyFun = (x: number, y: number) => number

export class SlopeField implements ISlopeFieldRaw {
  
  needleLength: number
  needleWidth: number
  gap: number
  f: xyFun
  g: xyFun

  static IsValid(sf: ISlopeFieldRaw): boolean {
    if(!sf) return false
    if(sf.needleLength < Number.EPSILON) return false
    if(sf.needleWidth < Number.EPSILON) return false
    if(sf.gap < Number.EPSILON) return false
    return true
  }

  constructor(sf: ISlopeFieldRaw, f: xyFun, g: xyFun) {

    if(!SlopeField.IsValid(sf)) {
      throw Error("Invalid Slope Field")
    }
    this.needleLength = +sf.needleLength
    this.needleWidth = +sf.needleWidth
    this.gap = +sf.gap
    this.f = f
    this.g = g 
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate, slopeFieldTrace?: ISlopeFieldTrace) {
    GraphSlopeField(canvas, coordinate, this, slopeFieldTrace)
  }
}