import { useState } from 'react'
import { ICoordinateRaw } from "../Graph/Coordinate/Coordinate"
import { ILogisticMapRaw } from "../Graph/LogisticMap/LogisticMap"
import { ParameterPanel } from './ParameterPanel'
import { ButtonPanel } from './ButtonPanel'

interface IControlPanelProp {
  coordinateRaw: ICoordinateRaw, 
  setCoordinateRaw: (coordinateRaw: ICoordinateRaw) => void,
  logisticMapRaw: ILogisticMapRaw,
  setLogisticMapRaw: (logisticMapRaw: ILogisticMapRaw) => void
  setRedraw: (redraw: boolean) => void
}

export function ControlPanel({
  coordinateRaw, setCoordinateRaw,
  logisticMapRaw, setLogisticMapRaw,
  setRedraw
}: IControlPanelProp) {

  return (<>
    <ParameterPanel logisticMapRaw={logisticMapRaw} setLogisticMapRaw={setLogisticMapRaw}/>
    <ButtonPanel coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw}
      logisticMapRaw={logisticMapRaw} setLogisticMapRaw={setLogisticMapRaw}
      setRedraw={setRedraw}/>
  </>)
}
