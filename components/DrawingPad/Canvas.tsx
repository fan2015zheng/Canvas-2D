import { useEffect, useRef, useState } from "react"
import Coordinate, { ICoordinateRaw } from "../Graph/Coordinate/Coordinate"
import { Erase } from "../Graph/Eraser"
import LogisticMap, { ILogisticMapRaw } from "../Graph/LogisticMap/LogisticMap"

interface ICanvasProp {
  coordinateRaw: ICoordinateRaw,
  logisticMapRaw: ILogisticMapRaw,
  redraw: boolean,
  setRedraw: (redraw: boolean) => void
}

export function Canvas({
  coordinateRaw, logisticMapRaw, redraw, setRedraw
} : ICanvasProp) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return

    //remove the following line to allow drawing only when button is clicked
    //if(!redraw) return

    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!LogisticMap.IsValid(logisticMapRaw)) return
    Erase(canvas)
    const coordinate = new Coordinate(coordinateRaw)
    const logisticMap = new LogisticMap(logisticMapRaw)
    coordinate.Draw(canvas)
    logisticMap.Draw(canvas, coordinate)

    setRedraw(false)
  })

  return(<>
    <canvas ref={canvasRef} width={coordinateRaw.maxPixelX} height={coordinateRaw.maxPixelY}></canvas>
  </>)
}