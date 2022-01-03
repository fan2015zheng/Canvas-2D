import { useEffect, useRef } from "react"
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
    maxX = parseFloat(maxX)
    maxY = parseFloat(maxY)
    minX = parseFloat(minX)
    minY = parseFloat(minY)
    originX = parseFloat(originX)
    originY = parseFloat(originY)
    xLabelGap = parseFloat(xLabelGap)
    yLabelGap = parseFloat(yLabelGap)

    if (isNaN(maxX)) { maxX = canvas.width }
    if (isNaN(maxY)) { maxY = canvas.height}
    if (isNaN(minX)) { minX = 0 }
    if (isNaN(minY)) { minY = 0 }
    if (isNaN(originX)) { originX = 0 }
    if (isNaN(originY)) { originY = 0 }
    if (isNaN(xLabelGap)) { xLabelGap = (maxX - minX)/5 }
    if (isNaN(yLabelGap)) { yLabelGap = (maxY - minY)/5 }
    if (isNaN(xRulePerLabel)){ xRulePerLabel = 2 }
    if (isNaN(yRulePerLabel)){ yRulePerLabel = 2 }

    if(xLabelGap < 0.01) { 
      xLabelGap = 0.01 
    }
    if(yLabelGap < 0.01) {
      yLabelGap = 0.01
    }

    const coordinate = new Coordinate(canvas.width, canvas.height,
      maxX, maxY, minX, minY, originX, originY, xLabelGap, yLabelGap, xRulePerLabel, yRulePerLabel)
    Graph(canvas, coordinate)
  })

  return(<>
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  </>)
}