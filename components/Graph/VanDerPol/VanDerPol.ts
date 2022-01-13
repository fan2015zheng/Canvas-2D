import Coordinate from "../Coordinate/Coordinate"
import { GraphVanDerPol } from "./GraphVanDerPol"

export interface IVanDerPolRaw {
  alpha: string | number
  C: string | number
  L: string | number
  lineWidth: string| number
  timeStep: string | number
  timeSteps: string | number
  voltageC0: string | number
  currentL0: string | number
  phaseLineWidth: string | number
  incrementalSteps: string | number
  useTimeSteps: boolean
}

export class VanDerPol implements IVanDerPolRaw {
  alpha: number
  C: number
  L: number
  lineWidth: number = 1
  timeStep: number
  voltageC0: number
  currentL0: number
  timeSteps: number
  phaseLineWidth: number
  incrementalSteps: number
  useTimeSteps: boolean
  dVoltageC_dt: (voltageC: number, currentL: number) => number
  dCurrentL_dt: (voltageC: number) => number

  static IsValid(van: IVanDerPolRaw) {
    if(!van) return false
    if(van.alpha === undefined || isNaN(+van.alpha)) return false
    if(van.C === undefined || isNaN(+van.C)) return false
    if(van.L === undefined || isNaN(+van.L)) return false
    if(van.lineWidth === undefined || isNaN(+van.lineWidth)) return false
    if(van.timeStep === undefined || isNaN(+van.timeStep)) return false
    if(van.voltageC0 === undefined || isNaN(+van.voltageC0)) return false
    if(van.currentL0 === undefined || isNaN(+van.currentL0)) return false
    if(van.alpha < Number.EPSILON) return false
    if(van.C < Number.EPSILON) return false
    if(van.L < Number.EPSILON) return false
    if(van.lineWidth < Number.EPSILON) return false
    if(van.timeStep < Number.EPSILON) return false
    if(van.timeSteps < 0) return false
    if(van.phaseLineWidth < Number.EPSILON) return false
    if(van.incrementalSteps < 1) return false

    return true
  }

  constructor(van: IVanDerPolRaw) {
    if(!VanDerPol.IsValid(van)) {
      throw Error("Invalid Van Der Pol parameters")
    }
    this.alpha = +van.alpha
    this.C = +van.C
    this.L = +van.L
    this.lineWidth = +van.lineWidth || 1
    this.timeStep = +van.timeStep
    this.timeSteps = +van.timeSteps
    this.voltageC0 = +van.voltageC0
    this.currentL0 = +van.currentL0
    this.phaseLineWidth = +van.phaseLineWidth
    this.incrementalSteps = +van.incrementalSteps
    this.useTimeSteps = van.useTimeSteps

    this.dVoltageC_dt = (voltageC: number, currentL: number) => {
      return (-currentL - this.alpha*voltageC*(voltageC*voltageC-1))/this.C
    }
    this.dCurrentL_dt = (voltageC: number) => {
      return voltageC/this.L
    }
  }


  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphVanDerPol(canvas, coordinate, this)
  }
}