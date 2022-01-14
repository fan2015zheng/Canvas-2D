import { useState } from 'react'
import Coordinate, { ICoordinateRaw } from '../Graph/Coordinate/Coordinate'
import { HDiv } from '../../components/Control/Div/Div'
import { DrawingPad } from '../DrawingPad/DrawingPad'
import cl from "./VanDerPolPage.module.scss"
import { IVanDerPolRaw, VanDerPol } from '../Graph/VanDerPol/VanDerPol'
import { VanDerPolParameterPanel } from './VanDerPolParameterPanel'
import { ISlopeFieldRaw, SlopeField } from '../Graph/SlopeField/SlopeField'
import { VanDerPolButtonPanel } from './VanDerPolButtonPanel'
import { SlopeFieldParameterPanel } from '../SlopeFieldPanel/SlopeFieldPanel'

export function VanDerPolPage() {
  
  const [coordinateRaw, setCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 600, maxPixelY: 300,
    maxX: 300, maxY: 12,
    minX: -50, minY: -5,
    originX: 0, originY: 0,
    xLabelGap: 100, yLabelGap: 5,
    xRulePerLabel: 5, yRulePerLabel: 2
  })

  const [fieldCoordinateRaw, setFieldCoordinateRaw] = useState<ICoordinateRaw>({
    maxPixelX: 350, maxPixelY: 350,
    maxX: 6, maxY: 6,
    minX: -2, minY: -2,
    originX: 0, originY: 0,
    xLabelGap: 1, yLabelGap: 1,
    xRulePerLabel: 2, yRulePerLabel: 2
  })
  const [vanDerPolRaw, setVanDerPolRaw] = useState<IVanDerPolRaw>({
    alpha: 1, C: 10, L: 10,
    lineWidth: 2, timeStep: 0.001, timeSteps: 0,
    voltageC0: 5, currentL0: 5,
    phaseLineWidth:5, incrementalSteps:300, useTimeSteps: false
  })

  const [slopeFieldRaw, setSlopeFieldRaw] = useState<ISlopeFieldRaw>({
    needleLength: 0.2,
    needleWidth: 0.5,
    gap: 0.3
  })

  function Draw(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(coordinateRaw)) return
    if(!VanDerPol.IsValid(vanDerPolRaw)) return
    const coordinate = new Coordinate(coordinateRaw)
    const vanDerPol = new VanDerPol(vanDerPolRaw)
    coordinate.Draw(canvas)
    vanDerPol.Draw(canvas, coordinate)
  }

  function DrawSlopeField(canvas: HTMLCanvasElement) {
    if(!Coordinate.IsValid(fieldCoordinateRaw)) return
    if(!SlopeField.IsValid(slopeFieldRaw)) return
    if(!VanDerPol.IsValid(vanDerPolRaw)) return
    const  coordinate = new Coordinate(fieldCoordinateRaw)
    const vanDerPol = new VanDerPol(vanDerPolRaw)
    const f = (x: number, y: number) => vanDerPol.dVoltageC_dt(x, y)
    const g = (x: number, y: number) => vanDerPol.dCurrentL_dt(x)
    const slopeField = new SlopeField(slopeFieldRaw,f, g)
    coordinate.Draw(canvas)
    slopeField.Draw(canvas, coordinate, {
      x0: vanDerPol.voltageC0,
      y0: vanDerPol.currentL0,
      traceWidth: vanDerPol.phaseLineWidth,
      step: vanDerPol.timeStep,
      steps: vanDerPol.timeSteps,
      incrementalSteps: vanDerPol.incrementalSteps
    })
  }

  return (<>
    <div className={cl.wrap}>
      <div className={cl.title}>Van Der Pol Oscillation</div>
      <div className={cl.subTitle}>explanation...</div>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw} 
        Draw={Draw}/>
      <HDiv height={10} />
      <VanDerPolParameterPanel vanDerPolRaw={vanDerPolRaw}
        setVanDerPolRaw={setVanDerPolRaw}/>
      <VanDerPolButtonPanel 
        vanDerPolRaw={vanDerPolRaw}
        setVanDerPolRaw={setVanDerPolRaw}/>
      <HDiv height={10} />

      <DrawingPad coordinateRaw={fieldCoordinateRaw} setCoordinateRaw={setFieldCoordinateRaw} 
        Draw={DrawSlopeField}/>
      <HDiv height={10} />
      <SlopeFieldParameterPanel 
        slopeFieldExtraRaw={vanDerPolRaw}
        setSlopeFieldExtraRaw={setVanDerPolRaw}
        slopeFieldRaw={slopeFieldRaw}
        setSlopeFieldRaw={setSlopeFieldRaw}/>
    </div>
  </>)
}
