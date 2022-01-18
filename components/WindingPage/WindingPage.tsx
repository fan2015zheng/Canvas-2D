import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import cl from "./WindingPage.module.scss"
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { IWindingRaw, Winding } from '../Graph/Winding/Winding'
import { SlopeFieldParameterPanel } from '../SlopeFieldPanel/SlopeFieldPanel'
import { WindingParameterPanel } from './WindingParameterPanel'
import { WindingButtonPanel } from './WindingButtonPanel'
import { ClosedCurve, IClosedCurveRaw } from '../Graph/Winding/ClosedCurve'

export function WindingPage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 500, maxPixelY: 500,
    maxX: 2, maxY: 2,
    minX: -2, minY: -2,
    originX: 0, originY: 0,
    xLabelGap: 1, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  
  const [windingRaw, setWindingRaw] = useState<IWindingRaw>({
    arrowLength: 0.5,
    arrowWidth: 5,
    expressionF: "x^2-y^2",
    expressionG: "2x*y", 
    curveSteps: 0,
  })
  const [curveRaw, setCurveRaw] = useState<IClosedCurveRaw>({
    formatPoints: "0,1 | -1,0 | 0,-1 | 1,0",
    twoPointSteps: 10,
    lineWidth: 2
  })

  const [slopeFieldRaw, setSlopeFieldRaw] = useState<ISlopeFieldRaw>({
    needleLength: 0.09,
    needleWidth: 0.7,
    gap: 0.1
  })


  function Draw(canvas: HTMLCanvasElement) {

    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!ClosedCurve.IsValid(curveRaw)) return
    if(!Winding.IsValid(windingRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const curve = new ClosedCurve(curveRaw,)
    const winding = new Winding(windingRaw, curve)
    coordinate.Draw(canvas)
    curve.Draw(canvas, coordinate)
    winding.Draw(canvas, coordinate)

    if(!SlopeField.IsValid(slopeFieldRaw)) return
    const slopeField = new SlopeField(slopeFieldRaw, winding.dx_dt, winding.dy_dt)
    slopeField.Draw(canvas, coordinate)
  }


  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Winding a violin string</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={Draw}/>
      <WindingButtonPanel windingRaw={windingRaw} setWindingRaw={setWindingRaw} />
      <HDiv height={10} />
      <WindingParameterPanel 
        curveRaw={curveRaw} setCurveRaw={setCurveRaw}
        windingRaw={windingRaw} setWindingRaw={setWindingRaw} />
      <SlopeFieldParameterPanel 
        slopeFieldRaw={slopeFieldRaw}
        setSlopeFieldRaw={setSlopeFieldRaw}/>
    </div>
  </>)
}
