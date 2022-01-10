import { useState } from 'react'
import Coordinate from "../Graph/Coordinate/Coordinate"
import LogisticMap, { IsLogisticMapValid } from "../Graph/LogisticMap/LogisticMap"
import { ParameterPanel } from './ParameterPanel'
import { ButtonPanel } from './ButtonPanel'

interface IControlPanelProp {
  coordinate: Coordinate, 
  setCoordinate: (coordinate: Coordinate) => void,
  logisticMap: LogisticMap
}

export function ControlPanel({
  coordinate, setCoordinate,
  logisticMap
}: IControlPanelProp) {
  const [logisticMap1, setLogisticMap1] = useState<LogisticMap>(logisticMap)

  return (<>
    <ParameterPanel logisticMap={logisticMap1} setLogisticMap={setLogisticMap1}/>
    <ButtonPanel coordinate={coordinate} setCoordinate={setCoordinate}
      logisticMap={logisticMap1} setLogisticMap={setLogisticMap1}/>
  </>)
}
