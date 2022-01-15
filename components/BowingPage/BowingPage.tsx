import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import cl from "./BowingPage.module.scss"
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { StictionParameterPanel } from './StictionParameterPanel'
import { IBowingRaw, Bowing } from '../Graph/Bowing/Bowing'
import { BowingParameterPanel } from './BowingParameterPanel'
import { IStictionRaw, Stiction } from '../Graph/Bowing/Stiction'
import { SlopeFieldParameterPanel } from '../SlopeFieldPanel/SlopeFieldPanel'
import { BowingButtonPanel } from './BowingButtonPanel'

export function BowingPage() {
  
  const [stictionCoordinateRaw, setStictionCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 10, maxY: 10,
    minX: -10, minY: -10,
    originX: 0, originY: 0,
    xLabelGap: 1, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  const [bowingCoordinateRaw, setBowingCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 150, maxY: 10,
    minX: -10, minY: -10,
    originX: 0, originY: 0,
    xLabelGap: 20, yLabelGap: 2,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  const [fieldCoordinateRaw, setFieldCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 350, maxPixelY: 350,
    maxX: 10, maxY: 5,
    minX: -10, minY: -5,
    originX: 0, originY: 0,
    xLabelGap: 2, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })

  const [stictionRaw, setStictionRaw] = useState<IStictionRaw>({
    y0: 5, x1: 3, y1: 2, lineWidth: 2, step:0.1})
  
  const [bowingRaw, setBowingRaw] = useState<IBowingRaw>({
    M: 5, k: 1, b: 2,
    lineWidth: 2, timeStep: 0.001, timeSteps: 0, x0: 1, v0: 0,  phaseLineWidth: 5,
    incrementalSteps: 1000, useTimeSteps: false
  })

  const [slopeFieldRaw, setSlopeFieldRaw] = useState<ISlopeFieldRaw>({
    needleLength: 0.8,
    needleWidth: 1,
    gap: 1
  })

  function StictionDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(stictionCoordinateRaw)) return
    if(!Stiction.IsValid(stictionRaw)) return
    const coordinate = new Coordinate(stictionCoordinateRaw)
    const stiction = new Stiction(stictionRaw)
    coordinate.Draw(canvas)
    stiction.Draw(canvas, coordinate)
  }

  function BowingDraw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(bowingCoordinateRaw)) return
    if(!Stiction.IsValid(stictionRaw)) return
    if(!Bowing.IsValid(bowingRaw)) return
    const coordinate = new Coordinate(bowingCoordinateRaw)
    const stiction = new Stiction(stictionRaw)
    const bowing = new Bowing(bowingRaw, stiction)
    coordinate.Draw(canvas)
    bowing.Draw(canvas, coordinate)
  }

  function DrawSlopeField(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(fieldCoordinateRaw)) return
    if(!SlopeField.IsValid(slopeFieldRaw)) return
    if(!Stiction.IsValid(stictionRaw)) return
    if(!Bowing.IsValid(bowingRaw)) return
    const  coordinate = new Coordinate(fieldCoordinateRaw)
    const stiction = new Stiction(stictionRaw)
    const bowing = new Bowing(bowingRaw, stiction)
    const f = (x: number, y: number) => bowing.dx_dt(y)
    const g = (x: number, y: number) => bowing.dv_dt(x,y)
    const slopeField = new SlopeField(slopeFieldRaw,f, g)
    coordinate.Draw(canvas)
    slopeField.Draw(canvas, coordinate, {
      x0: bowing.x0,
      y0: bowing.v0,
      traceWidth: bowing.phaseLineWidth,
      step: bowing.timeStep,
      steps: bowing.timeSteps,
      incrementalSteps: bowing.incrementalSteps
    })
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Bowing a violin string</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={stictionCoordinateRaw} setCoordinateRaw={setStictionCoordinateRaw} 
        Draw={StictionDraw}/>
      <StictionParameterPanel stictionRaw={stictionRaw} setStictionRaw={setStictionRaw}/>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={bowingCoordinateRaw} setCoordinateRaw={setBowingCoordinateRaw} 
        Draw={BowingDraw}/>
      <BowingParameterPanel bowingRaw={bowingRaw} setBowingRaw={setBowingRaw}/>
      <HDiv height={10} />
      <BowingButtonPanel bowingRaw={bowingRaw} setBowingRaw={setBowingRaw}/>
      <DrawingPad coordinateRaw={fieldCoordinateRaw} setCoordinateRaw={setFieldCoordinateRaw} 
        Draw={DrawSlopeField}/>
      <HDiv height={10} />
      <SlopeFieldParameterPanel 
        slopeFieldExtraRaw={bowingRaw}
        setSlopeFieldExtraRaw={setBowingRaw}
        slopeFieldRaw={slopeFieldRaw}
        setSlopeFieldRaw={setSlopeFieldRaw}/>
    </div>
  </>)
}
