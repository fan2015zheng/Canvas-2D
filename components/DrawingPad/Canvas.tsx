import { useEffect, useRef } from "react"

interface ICanvasProp {
  width: number
  height: number
  Draw: (canvas: HTMLCanvasElement) => void,
}

export function Canvas({width, height, Draw} : ICanvasProp) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) { return }
   
    Draw(canvas)
    
  })

  return(<>
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  </>)
}