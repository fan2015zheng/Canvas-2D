import { TunnelDiode } from "./TunnelDiode"

interface ITunnelDiodeCircuitRaw {
  R: string | number
  C: string | number
  L: string | number
  E: string | number
}

export class TunnelDiodeCircuit implements ITunnelDiodeCircuitRaw {
  R: number
  C: number
  L: number
  E: number
  tunnelDiode: TunnelDiode

  static IsValid(circuit: ITunnelDiodeCircuitRaw) {
    if(!circuit) return false
    if(circuit.R === undefined || isNaN(+circuit.R)) return false
    if(circuit.C === undefined || isNaN(+circuit.C)) return false
    if(circuit.L === undefined || isNaN(+circuit.L)) return false
    if(circuit.E === undefined || isNaN(+circuit.E)) return false
    if(circuit.R < Number.EPSILON) return false
    if(circuit.C < Number.EPSILON) return false
    if(circuit.L < Number.EPSILON) return false
    if(circuit.E < Number.EPSILON) return false

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
  }
}