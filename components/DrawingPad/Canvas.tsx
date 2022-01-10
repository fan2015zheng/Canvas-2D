import { useEffect, useRef, useState } from "react"
import { ICoordinateRaw } from "../Graph/Coordinate/Coordinate"

interface ICanvasProp {
  coordinateRaw: ICoordinateRaw,
  Draw: (canvas: HTMLCanvasElement) => void
}

export function Canvas({
  coordinateRaw, Draw
} : ICanvasProp) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    Draw(canvas)
  })

  return(<>
    <canvas ref={canvasRef} width={coordinateRaw.maxPixelX} height={coordinateRaw.maxPixelY}></canvas>
  </>)
}