import { xyFun } from "../SlopeField/SlopeField"
import { EvalFunction, parse } from "mathjs"
import Coordinate from "../Coordinate/Coordinate"
import { GraphWinding } from "./GraphWinding"
import { ClosedCurve } from "./ClosedCurve"

export interface IWindingRaw {
  arrowLength: string | number
  arrowWidth: string | number
  expressionF: string
  expressionG: string 
  curveSteps: string | number
}

export class Winding {
  arrowLength: number
  arrowWidth: number
  dx_dt: xyFun
  dy_dt: xyFun
  codeF: EvalFunction
  codeG: EvalFunction
  closedCurve: ClosedCurve
  curveSteps: number

  static IsValid(wind: IWindingRaw): boolean {
    if(isNaN(+wind.arrowLength)) return false
    if(isNaN(+wind.arrowWidth)) return false
    if(isNaN(+wind.curveSteps)) return false
    if(wind.arrowLength < Number.EPSILON) return false
    if(wind.arrowWidth < Number.EPSILON) return false

    try {
      parse(wind.expressionF)
      parse(wind.expressionG)
    } catch(e: any) {
      console.log(e.message)
      return false
    }

    return true
  }

  constructor(wind: IWindingRaw,  closedCurve: ClosedCurve) {
    if(!Winding.IsValid(wind)) throw Error("Invalid Winding")

    this.closedCurve = closedCurve
    this.curveSteps = +wind.curveSteps
    this.arrowLength = +wind.arrowLength
    this.arrowWidth = +wind.arrowWidth
    const nodeF = parse(wind.expressionF)
    this.codeF = nodeF.compile()
    const nodeG = parse(wind.expressionG)
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

  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphWinding(canvas, coordinate, this)
  }
}