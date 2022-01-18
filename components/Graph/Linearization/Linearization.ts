import { xyFun } from "../SlopeField/SlopeField"
import { EvalFunction, parse } from "mathjs"
import Coordinate from "../Coordinate/Coordinate"
import { GraphLinearization } from "./GraphLinearization"

export interface ILinearizationRaw {
  x0: string | number
  y0: string | number
  x1: string | number
  y1: string | number
  x2: string | number
  y2: string | number
  x3: string | number
  y3: string | number
  expressionF: string
  expressionG: string
  a: string | number
  b: string | number
  c: string | number
  d: string | number
  timeStep: string | number
  timeSteps: string | number
  incrementalSteps: string | number
  lineWidth: string | number
}

export class Linearization {
  x0: number
  y0: number
  x1: number
  y1: number
  x2: number
  y2: number
  x3: number
  y3: number
  a: number
  b: number
  c: number
  d: number
  timeStep: number
  timeSteps: number
  incrementalSteps: number
  lineWidth: number
  codeF: EvalFunction
  codeG: EvalFunction
  dx_dt: xyFun
  dy_dt: xyFun
  dx_dtLinear: xyFun
  dy_dtLinear: xyFun

  static IsValid(lin: ILinearizationRaw): boolean {
    if(lin.x0 === undefined || isNaN(+lin.x0)) return false
    if(lin.y0 === undefined || isNaN(+lin.y0)) return false
    if(lin.x1 === undefined || isNaN(+lin.x1)) return false
    if(lin.y1 === undefined || isNaN(+lin.y1)) return false
    if(lin.x2 === undefined || isNaN(+lin.x2)) return false
    if(lin.y2 === undefined || isNaN(+lin.y2)) return false
    if(lin.x3 === undefined || isNaN(+lin.x3)) return false
    if(lin.y3 === undefined || isNaN(+lin.y3)) return false

    if(lin.a === undefined || isNaN(+lin.a)) return false
    if(lin.b === undefined || isNaN(+lin.b)) return false
    if(lin.c === undefined || isNaN(+lin.c)) return false
    if(lin.d === undefined || isNaN(+lin.d)) return false
    if(lin.timeStep === undefined || isNaN(+lin.timeStep)) return false
    if(lin.timeSteps === undefined || isNaN(+lin.timeSteps)) return false
    if(lin.incrementalSteps === undefined || isNaN(+lin.incrementalSteps)) return false
    if(lin.lineWidth === undefined || isNaN(+lin.lineWidth)) return false

    if(lin.timeStep < Number.EPSILON) return false
    if(lin.timeSteps < Number.EPSILON) return false
    if(lin.incrementalSteps < Number.EPSILON) return false
    if(lin.lineWidth < Number.EPSILON) return false
    
    try {
      parse(lin.expressionF)
      parse(lin.expressionG)
    } catch(e: any) {
      console.log(e.message)
      return false
    }
    return true
  }

  constructor(lin: ILinearizationRaw) {
    if(!Linearization.IsValid(lin)) throw Error("Invalid Linearization")
    this.x0 = +lin.x0
    this.y0 = +lin.y0
    this.x1 = +lin.x1
    this.y1 = +lin.y1
    this.x2 = +lin.x2
    this.y2 = +lin.y2
    this.x3 = +lin.x3
    this.y3 = +lin.y3
    this.a = +lin.a
    this.b = +lin.b
    this.c = +lin.c
    this.d = +lin.d
    this.timeStep = +lin.timeStep
    this.timeSteps = +lin.timeSteps
    this.incrementalSteps = +lin.incrementalSteps
    this.lineWidth = +lin.lineWidth

    const nodeF = parse(lin.expressionF)
    this.codeF = nodeF.compile()
    const nodeG = parse(lin.expressionG)
    this.codeG = nodeG.compile()

    this.dx_dt = (x: number, y: number) => {
      try {
        const scope = {x, y}
        return this.codeF.evaluate(scope)
      } catch(e) {
        return 0
      }
    }
    this.dy_dt = (x: number, y: number) => {
      try {
        const scope = {x, y}
        return this.codeG.evaluate(scope)
      } catch(e) {
        return 0
      }
    }
    this.dx_dtLinear = (x: number, y: number) => {
      return this.a*x+this.b*y
    }
    this.dy_dtLinear = (x: number, y: number) => {
      return this.c*x+this.d*y
    }
  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate, linear: boolean) {
    GraphLinearization(canvas, coordinate, this, linear)
  }
}