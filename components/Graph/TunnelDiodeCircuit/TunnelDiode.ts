import Coordinate from "../Coordinate/Coordinate"
import { GraphTunnelDiode } from "./GraphTunnelDiode"

export interface ITunnelDiodeRaw {
  x1: string | number
  y1: string | number
  x2: string | number
  y2: string | number
  x3: string | number
  y3: string | number
  lineWidth: string | number
}

export class TunnelDiode implements ITunnelDiodeRaw {
  x1: number
  y1: number
  x2: number
  y2: number
  x3: number
  y3: number
  lineWidth: number = 1
  f: (x: number) => number
  
  static IsValid(diode: ITunnelDiodeRaw) {
    if(!diode) return false
    if(diode.x1 === undefined || isNaN(+diode.x1)) return false
    if(diode.x2 === undefined || isNaN(+diode.x2)) return false
    if(diode.x3 === undefined || isNaN(+diode.x3)) return false
    if(diode.y1 === undefined || isNaN(+diode.y1)) return false
    if(diode.y2 === undefined || isNaN(+diode.y2)) return false
    if(diode.y3 === undefined || isNaN(+diode.y3)) return false
    if(diode.lineWidth === undefined || isNaN(+diode.lineWidth)) return false

    if(diode.x1 < Number.EPSILON) return false
    if(diode.y1 < Number.EPSILON) return false
    if(+diode.x2 - +diode.x1 < Number.EPSILON) return false
    if(+diode.y2 - +diode.y1 > -Number.EPSILON) return false
    if(+diode.x3 - +diode.x2 < Number.EPSILON) return false
    if(+diode.y3 - +diode.y2 < Number.EPSILON) return false
    if(+diode.lineWidth < Number.EPSILON) return false

    return true
  }

  constructor(diode: ITunnelDiodeRaw) {
    if(!TunnelDiode.IsValid(diode)) {
      throw Error("Invalid Tunnel Diode")
    }
    this.x1 = +diode.x1
    this.x2 = +diode.x2
    this.x3 = +diode.x3
    this.y1 = +diode.y1
    this.y2 = +diode.y2
    this.y3 = +diode.y3
    this.lineWidth = +diode.lineWidth || 1
    this.f = (x: number) => {
      if(x>0 && x<=diode.x1) {
        return linearFun(0,0, +diode.x1, +diode.y1, x)
      }
      if(x>diode.x1 && x<=diode.x2) {
        return linearFun(+diode.x1, +diode.y1, +diode.x2, +diode.y2, x)
      }
      if(x>diode.x2) {
        return linearFun(+diode.x2, +diode.y2, +diode.x3, +diode.y3, x)
      }
      return 0
    }
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphTunnelDiode(canvas, coordinate, this)
  }
}


function linearFun(x1: number, y1: number, x2: number, y2: number, x: number) {
  return (x-x1)*(y2-y1)/(x2-x1)+y1
}