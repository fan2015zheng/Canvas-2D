import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import { Erase } from '../Graph/Eraser'
import cl from "./TunnelDiodePage.module.scss"

export function TunnelDiodePage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 800,
    maxPixelY: 400,
    maxX: 100,
    maxY: 1.05,
    minX: -10,
    minY: -0.1,
    originX: 0,
    originY: 0,
    xLabelGap: 10,
    yLabelGap: 0.1,
    xRulePerLabel: 2, 
    yRulePerLabel: 2
  })

  const [redraw, setRedraw] = useState<boolean>(true)

  function Draw(canvas: HTMLCanvasElement) {
    if(!redraw) return
    if(!Coordinate.IsValid(coordinateRaw)) return
    Erase(canvas)
    const coordinate = new Coordinate(coordinateRaw)
    coordinate.Draw(canvas)
    setRedraw(false)
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Tunnel Diode</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={Draw}/>

      <HDiv height={10} />
    </div>
  </>)
}
