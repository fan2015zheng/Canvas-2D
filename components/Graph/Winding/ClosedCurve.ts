import Coordinate from "../Coordinate/Coordinate"
import { GraphClosedCurve } from "./GraphClosedCurve"

export interface IClosedCurveRaw {
  formatPoints: string
  twoPointSteps: string | number
  lineWidth: string | number
}

interface IPoint {
  x: number
  y: number
}

export class ClosedCurve {
  f: (steps: number) => IPoint
  points: IPoint[] = []
  lineWidth: number

  static IsValid(curve: IClosedCurveRaw): boolean {
    if(!parsePoints(curve.formatPoints)) return false
    if(curve.twoPointSteps === undefined || isNaN(+curve.twoPointSteps)) return false
    if(curve.lineWidth === undefined || isNaN(+curve.lineWidth)) return false
    if(curve.twoPointSteps < 1) return false
    if(curve.twoPointSteps < Number.EPSILON) return false
    return true
  }

  constructor(curve: IClosedCurveRaw) {
    if(!ClosedCurve.IsValid(curve)) throw Error("Invalid Curve")
    
    const points = parsePoints(curve.formatPoints)

    if(points) {
      this.points = points
    }
    this.lineWidth = +curve.lineWidth
    this.f = (steps: number) => {
      const twoPointSteps = Math.round(+curve.twoPointSteps)
      const n = this.points.length

      steps = Math.round(steps)
      if(steps < 0) {
        steps = n * twoPointSteps + steps
      }
  
      const index = Math.floor(steps/twoPointSteps)
      const restSteps = steps%twoPointSteps
      let beginPoint = this.points[index%n]
      let endPoint = this.points[(index+1)%n]
      const r = restSteps / twoPointSteps
      const x = beginPoint.x * (1-r) + endPoint.x * r
      const y = beginPoint.y * (1-r) + endPoint.y * r

      return {x, y}
    }

  }

  Draw(canvas: HTMLCanvasElement, coordinate: Coordinate) {
    GraphClosedCurve(canvas, coordinate, this)
  }
}

function parsePoints(formatPoints:string): IPoint[] | null {
  const points: IPoint[] = []
  const formatPointsArr = formatPoints.split("|")
  for(let i=0; i<formatPointsArr.length; i++) {
    const formatPoint = formatPointsArr[i]
    if(!formatPoint) return null
    let [x, y] = formatPoint.split(",")
    x=x.trim()
    y=y.trim()
    if(isNaN(+x) || isNaN(+y)) return null
    const point: IPoint = {x: +x, y: +y}
    points.push(point)
  }
  if(points.length < 1) return null
  return points
}