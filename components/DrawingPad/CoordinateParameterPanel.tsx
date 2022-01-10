import { TextField } from "../Control/Field/TextField"
import Coordinate from "../Graph/Coordinate/Coordinate"
import cl from "./CoordinateParameterPanel.module.scss"

interface ICoordinateParameterPanelProp {
  coordinate: Coordinate,
  setCoordinate: (coordinate: Coordinate) => void
}

export function CoordinateParameterPanel({
  coordinate, setCoordinate
}: ICoordinateParameterPanelProp) {

  function setMaxPixelX(value: number) {
    coordinate.maxPixelX = +value
    setCoordinate(coordinate.Copy()) 
  }
  function setMaxPixelY(value: number) { 
    coordinate.maxPixelY = +value
    setCoordinate(coordinate.Copy())
   }
  function setMaxX(value: number) { 
    coordinate.maxX = +value
    setCoordinate(coordinate.Copy())
   }
  function setMinX(value: number) { 
    coordinate.minX = +value
    setCoordinate(coordinate.Copy())
  }
  function setMaxY(value: number) {
    coordinate.maxX = +value
    setCoordinate(coordinate.Copy())
  }
  function setMinY(value: number) {
    coordinate.minY = +value
    setCoordinate(coordinate.Copy())
  }
  function setOriginX(value: number) { 
    coordinate.originX = +value
    setCoordinate(coordinate.Copy())
  }
  function setOriginY(value: number) {
    coordinate.originY = +value
    setCoordinate(coordinate.Copy())
  }
  function setXLabelGap(value: number) {
    coordinate.xLabelGap = +value
    setCoordinate(coordinate.Copy())
  }
  function setYLabelGap(value: number) {
    coordinate.yLabelGap = +value
    setCoordinate(coordinate.Copy())
  }
  function setXRulePerLabel(value: number) {
    coordinate.xRulePerLabel = +value
    setCoordinate(coordinate.Copy())
  }
  function setYRulePerLabel(value: number) {
    coordinate.yRulePerLabel = +value
    setCoordinate(coordinate.Copy())
  }

  return(<>
    <div className={cl.fields}>
      <TextField prompt="Width" value={coordinate.maxPixelX} setValue={setMaxPixelX} />
      <TextField prompt="Height" value={coordinate.maxPixelY} setValue={setMaxPixelY} />
      <TextField prompt="Max X" value={coordinate.maxX} setValue={setMaxX} />
      <TextField prompt="Max Y" value={coordinate.maxY} setValue={setMaxY} />
      <TextField prompt="Min X" value={coordinate.minX} setValue={setMinX} />
      <TextField prompt="Min Y" value={coordinate.minY} setValue={setMinY} />
      <TextField prompt="Origin X" value={coordinate.originX} setValue={setOriginX} />
      <TextField prompt="Origin Y" value={coordinate.originY} setValue={setOriginY} />
      <TextField prompt="X Label Gap" value={coordinate.xLabelGap} setValue={setXLabelGap} />
      <TextField prompt="Y Label Gap" value={coordinate.yLabelGap} setValue={setYLabelGap} />
      <TextField prompt="X Rules" value={coordinate.xRulePerLabel} setValue={setXRulePerLabel} />
      <TextField prompt="Y Rules" value={coordinate.yRulePerLabel} setValue={setYRulePerLabel} />
    </div>
  </>)
}