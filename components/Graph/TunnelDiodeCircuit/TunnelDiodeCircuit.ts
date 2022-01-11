import Coordinate from "../Coordinate/Coordinate"
import { GraphTunnelDiodeCircuit } from "./GraphTunnelDiodeCircuit"
import { TunnelDiode } from "./TunnelDiode"

export interface ITunnelDiodeCircuitRaw {
  R: string | number
  C: string | number
  L: string | number
  E: string | number
  lineWidth: string| number
  timeStep: string | number
  voltageC0: string | number
  currentL0: string | number
}

export class TunnelDiodeCircuit implements ITunnelDiodeCircuitRaw {
  R: number
  C: number
  L: number
  E: number
  tunnelDiode: TunnelDiode
  lineWidth: number = 1
  timeStep: number
  voltageC0: number
  currentL0: number
  dVoltageC_dt: (voltageC: number, currentL: number) => number
  dCurrentL_dt: (voltageC: number, currentL: number) => number

  static IsValid(circuit: ITunnelDiodeCircuitRaw) {
    if(!circuit) return false
    if(circuit.R === undefined || isNaN(+circuit.R)) return false
    if(circuit.C === undefined || isNaN(+circuit.C)) return false
    if(circuit.L === undefined || isNaN(+circuit.L)) return false
    if(circuit.E === undefined || isNaN(+circuit.E)) return false
    if(circuit.lineWidth === undefined || isNaN(+circuit.lineWidth)) return false
    if(circuit.timeStep === undefined || isNaN(+circuit.timeStep)) return false
    if(circuit.voltageC0 === undefined || isNaN(+circuit.voltageC0)) return false
    if(circuit.currentL0 === undefined || isNaN(+circuit.currentL0)) return false
    if(circuit.R < Number.EPSILON) return false
    if(circuit.C < Number.EPSILON) return false
    if(circuit.L < Number.EPSILON) return false
    if(circuit.E < Number.EPSILON) return false
    if(circuit.lineWidth < Number.EPSILON) return false
    if(circuit.timeStep < Number.EPSILON) return false

    return true
  }

  constructor(circuit: ITunnelDiodeCircuitRaw, diode: TunnelDiode) {
    if(!TunnelDiodeCircuit.IsValid(circuit)) {
      throw Error("Invalid Tunnel Diode Circuit")
    }
    this.R = +circuit.R
    this.C = +circuit.C
    this.L = +circuit.L
    this.E = +circuit.E
    this.tunnelDiode = diode
    this.lineWidth = +circuit.lineWidth || 1
    this.timeStep = +circuit.timeStep
    this.voltageC0 = +circuit.voltageC0
    this.currentL0 = +circuit.currentL0

    this.dVoltageC_dt = (voltageC: number, currentL: number) => {
      return (-diode.f(voltageC) + currentL)/this.C
    }
    this.dCurrentL_dt = (voltageC: number, currentL: number) => {
      return (-voltageC - this.R * currentL + this.E)/this.L
    }
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphTunnelDiodeCircuit(canvas, coordinate, this)
  }
}