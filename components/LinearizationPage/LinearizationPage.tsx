import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import cl from "./LinearizationPage.module.scss"
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { ILinearizationRaw, Linearization } from '../Graph/Linearization/Linearization'
import { SlopeFieldParameterPanel } from '../SlopeFieldPanel/SlopeFieldPanel'

export function LinearizationPage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 10, maxY: 10,
    minX: -10, minY: -10,
    originX: 0, originY: 0,
    xLabelGap: 1, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  
  const [linearizationRaw, setLinearizationRaw] = useState<ILinearizationRaw>({
    x0: 1, y0: 0, x1: "", y1: "", x2: "", y2: "",
    expressionF: "x+y", expressionG: "x-y", 
    a: "", b: "", c: "", d: "",
    timeStep: 0.1, timeSteps: 100, incrementalSteps: 100, lineWidth: 1
  })

  const [slopeFieldRaw, setSlopeFieldRaw] = useState<ISlopeFieldRaw>({
    needleLength: 0.8,
    needleWidth: 1,
    gap: 1
  })


  function LinearDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!Linearization.IsValid(linearizationRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const linearization = new Linearization(linearizationRaw)
    coordinate.Draw(canvas)
    linearization.Draw(canvas, coordinate, true)
  }

  function NonLinearDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!Linearization.IsValid(linearizationRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const linearization = new Linearization(linearizationRaw)
    coordinate.Draw(canvas)
    linearization.Draw(canvas, coordinate, false)
  }

  function DrawSlopeField(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!SlopeField.IsValid(slopeFieldRaw)) return
    if(!Linearization.IsValid(linearizationRaw)) return
    const  coordinate = new Coordinate(coordinateRaw)
    const linearization = new Linearization(linearizationRaw)
    const f = linearization.dx_dt
    const g = linearization.dy_dt
    const slopeField = new SlopeField(slopeFieldRaw,f, g)
    coordinate.Draw(canvas)
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
      <HDiv height={10} />
      <SlopeFieldParameterPanel 
        slopeFieldRaw={slopeFieldRaw}
        setSlopeFieldRaw={setSlopeFieldRaw}/>
    </div>
  </>)
}
