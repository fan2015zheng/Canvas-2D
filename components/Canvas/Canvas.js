import { useEffect, useRef } from "react"
import cl from "./Canvas.module.scss"
import Coordinate from "./Cooridnate"
import { Graph } from "./Graph"

export default function Canvas({
  width, height,
  maxX,maxY,
  minX,minY,
  originX,originY,
  xLabelGap,yLabelGap,
  xRulePerLabel,yRulePerLabel
}) {

  width = width || 300
  height = height || 200

  const canvasRef = useRef()

  useEffect(()=>{
    
    const canvas = canvasRef.current
    if(!canvas) { return }
    if (maxX === undefined) { maxX = canvas.width }
    if (maxY === undefined) { maxY = canvas.height}
    if (minX === undefined) { minX = 0 }
    if (minY === undefined) { minY = 0 }
    if (originX === undefined) { originX = 0 }
    if (originY === undefined) { originY = 0 }
    if (xLabelGap === undefined) { xLabelGap = (maxX - minX)/5 }
    if (yLabelGap === undefined) { yLabelGap = (maxY - minY)/5 }
    if (xRulePerLabel === undefined){ xRulePerLabel = 2 }
    if (yRulePerLabel === undefined){ yRulePerLabel = 2 }
    const coordinate = new Coordinate(canvas.width, canvas.height,
      maxX, maxY, minX, minY, originX, originY, xLabelGap, yLabelGap, xRulePerLabel, yRulePerLabel)

    Graph(canvas, coordinate)
  })

  return(<>
    <canvas ref={canvasRef} width={width} height={height}></canvas>

  </>)
}