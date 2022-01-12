import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import cl from "./VanDerPolPage.module.scss"
import { IVanDerPolRaw, VanDerPol } from '../Graph/VanDerPol/VanDerPol'

export function VanDerPolPage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 1000, maxY: 10,
    minX: -100, minY: -10,
    originX: 0, originY: 0,
    xLabelGap: 100, yLabelGap: 5,
    xRulePerLabel: 5, yRulePerLabel: 2
  })

  const [vanDerPolRaw, setVanDerPolRaw] = useState<IVanDerPolRaw>({
    alpha: 1, C: 10, L: 10,
    lineWidth: 2, timeStep: 0.01, voltageC0: 10, currentL0: 10
  })


  function Draw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!VanDerPol.IsValid(vanDerPolRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const vanDerPol = new VanDerPol(vanDerPolRaw)
    coordinate.Draw(canvas)
    vanDerPol.Draw(canvas, coordinate)
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Van Der Pol Oscillation</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={Draw}/>
    </div>
  </>)
}
