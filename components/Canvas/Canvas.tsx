import { useEffect, useRef } from "react"
import { Graph } from "./Graph"
import type Coordinate from "./Cooridnate"
import LogisticMap from "./LogisticMap"

interface ICanvasProp {
  coordinate?: Coordinate
  logisticMap?: LogisticMap
}

export function Canvas({coordinate, logisticMap} : ICanvasProp) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) { return }
    if(!coordinate) { return }
    if(!coordinate.IsValid()) { return }

    Graph(canvas, coordinate, logisticMap)
  })

  if(!coordinate) {
    return null
  }

  return(<>
    <canvas ref={canvasRef} width={coordinate.maxPixelX} height={coordinate.maxPixelY}></canvas>
  </>)
}