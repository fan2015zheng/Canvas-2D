import { useState } from 'react'
import { TextField } from "../Field/TextField"
import cl from "./ControlPanel.module.scss"
import Coordinate, { IsCoordinateValid } from './Cooridnate'

interface IControlPanelProp {
  apply?: (coordinate: Coordinate) => void
  defaultCoordinate: Coordinate
}

export function ControlPanel({apply, defaultCoordinate}: IControlPanelProp) {
  
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

  const xRulePerGap = 2
  const yRulePerGap = 2

  const onClickApply = ()=>{
    if(IsCoordinateValid(
      maxPixelX, maxPixelY, maxX, maxY, minX, minY, 
      xLabelGap, yLabelGap, xRulePerGap, yRulePerGap)
    ) {
      const coordinate = new Coordinate(
        maxPixelX, maxPixelY, maxX, maxY, minX, minY, originX, originY,
        xLabelGap, yLabelGap, xRulePerGap, yRulePerGap
      )
     
      if(apply) { apply(coordinate) }
    } else {
      alert("Parameters are not valid")
    }
  }

  return (<>
    <div className={cl.fields}>
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
    </div>
    <div>
      <button onClick={onClickApply}>Apply</button>
    </div>
  </>)
}
