import { useEffect, useRef } from "react"
import { Graph } from "./Graph"
import type Coordinate from "./Cooridnate"

interface ICanvasProp {
  coordinate?: Coordinate
}

export function Canvas({coordinate} : ICanvasProp) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) { return }
    if(!coordinate) { return }
    if(!coordinate.IsValid()) { return }

    Graph(canvas, coordinate)
  })

  if(!coordinate) {
    return null
  }

  return(<>
    <canvas ref={canvasRef} width={coordinate.maxPixelX} height={coordinate.maxPixelY}></canvas>
  </>)
}