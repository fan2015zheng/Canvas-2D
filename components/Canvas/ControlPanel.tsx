import { useState } from 'react'
import { TextField } from "../Field/TextField"
import cl from "./ControlPanel.module.scss"
import Coordinate, { IsCoordinateValid } from './Cooridnate'
import LogisticMap, { IsLogisticValid } from './LogisticMap'

interface IControlPanelProp {
  apply?: (coordinate: Coordinate, logisticMap: LogisticMap) => void
  defaultCoordinate: Coordinate
  defaultLogisticMap: LogisticMap
}

export function ControlPanel({
  apply, defaultCoordinate, defaultLogisticMap
}: IControlPanelProp) {
  
  const [logisticH, setLogisticH] = useState<number>(defaultLogisticMap.h)
  const [logisticX0, setLogisticX0] = useState<number>(defaultLogisticMap.x0)
  const [maxPixelX, setMaxPixelX] = useState<number>(defaultCoordinate.maxPixelX)
  const [maxPixelY, setMaxPixelY] = useState<number>(defaultCoordinate.maxPixelY)
  const [maxX, setMaxX] = useState<number>(defaultCoordinate.maxX)
  const [maxY, setMaxY] = useState<number>(defaultCoordinate.maxY)
  const [minX, setMinX] = useState<number>(defaultCoordinate.minX)
  const [minY, setMinY] = useState<number>(defaultCoordinate.minY)
  const [originX, setOriginX] = useState<number>(defaultCoordinate.originX)
  const [originY, setOriginY] = useState<number>(defaultCoordinate.originY)
  const [xLabelGap, setXLabelGap] = useState<number>(defaultCoordinate.xLabelGap)
  const [yLabelGap, setYLabelGap] = useState<number>(defaultCoordinate.yLabelGap)
  const [xRulePerLabel, setXRulePerLabel] = useState<number>(defaultCoordinate.xRulePerLabel)
  const [yRulePerLabel, setYRulePerLabel] = useState<number>(defaultCoordinate.yRulePerLabel)

  const onClickApply = ()=>{
    if(
      IsCoordinateValid(maxPixelX, maxPixelY, maxX, maxY, minX, minY, 
        xLabelGap, yLabelGap, xRulePerLabel, yRulePerLabel) && 
      IsLogisticValid(logisticH, logisticX0)
    ) {
      const coordinate = new Coordinate(
        maxPixelX, maxPixelY, maxX, maxY, minX, minY, originX, originY,
        xLabelGap, yLabelGap, xRulePerLabel, yRulePerLabel
      )
      const logisticMap = new LogisticMap(logisticH, logisticX0)
     
      if(apply) { apply(coordinate, logisticMap) }
    } else {
      alert("Parameters are not valid")
    }
  }

  return (<>
    <div className={cl.fields}>
      <TextField prompt="Parameter h" value={logisticH} setValue={setLogisticH} />
      <TextField prompt="Initial x0" value={logisticX0} setValue={setLogisticX0} />
      <TextField prompt="Canvas Width" value={maxPixelX} setValue={setMaxPixelX} />
      <TextField prompt="Canvas Height" value={maxPixelY} setValue={setMaxPixelY} />
      <TextField prompt="Max X" value={maxX} setValue={setMaxX} />
      <TextField prompt="Min X" value={minX} setValue={setMinX} />
      <TextField prompt="Max Y" value={maxY} setValue={setMaxY} />
      <TextField prompt="Min Y" value={minY} setValue={setMinY} />
      <TextField prompt="Origin X" value={originX} setValue={setOriginX} />
      <TextField prompt="Origin Y" value={originY} setValue={setOriginY} />
      <TextField prompt="X Label Gap" value={xLabelGap} setValue={setXLabelGap} />
      <TextField prompt="Y Label Gap" value={yLabelGap} setValue={setYLabelGap} />
      <TextField prompt="X Rules Per Label" value={xRulePerLabel} setValue={setXRulePerLabel} />
      <TextField prompt="Y Rules Per Label" value={yRulePerLabel} setValue={setYRulePerLabel} />
    </div>
    <div>
      <button className={cl.button} onClick={onClickApply}>Apply</button>
    </div>
  </>)
}
