import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import cl from "./LinearizationPage.module.scss"
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { ILinearizationRaw, Linearization } from '../Graph/Linearization/Linearization'
import { SlopeFieldParameterPanel } from '../SlopeFieldPanel/SlopeFieldPanel'
import { LinearizationParameterPanel } from './LinearizationParameterPanel'
import { LinearizationButtonPanel } from './LinearizationButtonPanel'

export function LinearizationPage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 2, maxY: 2,
    minX: -2, minY: -2,
    originX: 0, originY: 0,
    xLabelGap: 1, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  
  const [linearizationRaw, setLinearizationRaw] = useState<ILinearizationRaw>({
    x0: 0.1, y0: 0.3, x1: -0.2, y1: 0.1, x2: -0.1, y2: -0.3, x3:0.2, y3:-0.1,
    expressionF: "y", expressionG: "x-x^3-y", 
    a: 0, b: 1, c: 1, d: -1,
    timeStep: 0.001, timeSteps: 4000, incrementalSteps: 1000, lineWidth: 3
  })

  const [slopeFieldRaw, setSlopeFieldRaw] = useState<ISlopeFieldRaw>({
    needleLength: 0.13,
    needleWidth: 0.5,
    gap: 0.2
  })


  function LinearDraw(canvas: HTMLCanvasElement) {

    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!Linearization.IsValid(linearizationRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const linearization = new Linearization(linearizationRaw)
    coordinate.Draw(canvas)
    linearization.Draw(canvas, coordinate, true)

    if(!SlopeField.IsValid(slopeFieldRaw)) return
    const slopeField = new SlopeField(slopeFieldRaw, linearization.dx_dtLinear, linearization.dy_dtLinear)
    slopeField.Draw(canvas, coordinate)
  }

  function NonLinearDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!Linearization.IsValid(linearizationRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const linearization = new Linearization(linearizationRaw)
    coordinate.Draw(canvas)
    linearization.Draw(canvas, coordinate, false)

    if(!SlopeField.IsValid(slopeFieldRaw)) return
    const slopeField = new SlopeField(slopeFieldRaw, linearization.dx_dt, linearization.dy_dt)
    slopeField.Draw(canvas, coordinate)
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Linearization a violin string</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={NonLinearDraw}/>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={LinearDraw}/>
      <LinearizationButtonPanel linearizationRaw={linearizationRaw} setLinearizationRaw={setLinearizationRaw} />
      <HDiv height={10} />
      <LinearizationParameterPanel 
        linearizationRaw={linearizationRaw} setLinearizationRaw={setLinearizationRaw} />
      <SlopeFieldParameterPanel 
        slopeFieldRaw={slopeFieldRaw}
        setSlopeFieldRaw={setSlopeFieldRaw}/>
    </div>
  </>)
}
