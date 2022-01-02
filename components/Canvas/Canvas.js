import { useEffect, useRef } from "react"
import cl from "./Canvas.module.scss"
import { Graph } from "./Graph"

export default function Canvas({
  width, height
}) {

  width = width || 300
  height = height || 200

  const canvasRef = useRef()

  useEffect(()=>{
    Graph(canvasRef.current)
  })

  return(<>
    <canvas ref={canvasRef} width={width} height={height}></canvas>

  </>)
}