import { TextField } from "../Control/Field/TextField"
import { ICoordinateRaw } from "../Graph/Coordinate/Coordinate"
import cl from "./CoordinateParameterPanel.module.scss"

interface ICoordinateParameterPanelProp {
  coordinateRaw: ICoordinateRaw,
  setCoordinateRaw: (coordinateRaw: ICoordinateRaw) => void
}

export function CoordinateParameterPanel({
  coordinateRaw, setCoordinateRaw
}: ICoordinateParameterPanelProp) {

  function setMaxPixelX(maxPixelX: string) {setCoordinateRaw({...coordinateRaw, maxPixelX}) }
  function setMaxPixelY(maxPixelY: string) {setCoordinateRaw({...coordinateRaw, maxPixelY}) }
  function setMaxX(maxX: string) {setCoordinateRaw({...coordinateRaw, maxX}) }
  function setMinX(minX: string) {setCoordinateRaw({...coordinateRaw, minX}) }
  function setMaxY(maxY: string) {setCoordinateRaw({...coordinateRaw, maxY}) }
  function setMinY(minY: string) {setCoordinateRaw({...coordinateRaw, minY}) }
  function setOriginX(originX: string) {setCoordinateRaw({...coordinateRaw, originX}) }
  function setOriginY(originY: string) {setCoordinateRaw({...coordinateRaw, originY}) }
  function setXLabelGap(xLabelGap: string) {setCoordinateRaw({...coordinateRaw, xLabelGap}) }
  function setYLabelGap(yLabelGap: string) {setCoordinateRaw({...coordinateRaw, yLabelGap}) }
  function setXRulePerLabel(xRulePerLabel: string) {setCoordinateRaw({...coordinateRaw, xRulePerLabel}) }
  function setYRulePerLabel(yRulePerLabel: string) {setCoordinateRaw({...coordinateRaw, yRulePerLabel}) }
  
  if(!coordinateRaw) {
    return null
  }

  return(<>
    <div className={cl.fields}>
      <TextField prompt="Width" value={coordinateRaw.maxPixelX} setValue={setMaxPixelX} />
      <TextField prompt="Height" value={coordinateRaw.maxPixelY} setValue={setMaxPixelY} />
      <TextField prompt="Max X" value={coordinateRaw.maxX} setValue={setMaxX} />
      <TextField prompt="Max Y" value={coordinateRaw.maxY} setValue={setMaxY} />
      <TextField prompt="Min X" value={coordinateRaw.minX} setValue={setMinX} />
      <TextField prompt="Min Y" value={coordinateRaw.minY} setValue={setMinY} />
      <TextField prompt="Origin X" value={coordinateRaw.originX} setValue={setOriginX} />
      <TextField prompt="Origin Y" value={coordinateRaw.originY} setValue={setOriginY} />
      <TextField prompt="X Label Gap" value={coordinateRaw.xLabelGap} setValue={setXLabelGap} />
      <TextField prompt="Y Label Gap" value={coordinateRaw.yLabelGap} setValue={setYLabelGap} />
      <TextField prompt="X Rules" value={coordinateRaw.xRulePerLabel} setValue={setXRulePerLabel} />
      <TextField prompt="Y Rules" value={coordinateRaw.yRulePerLabel} setValue={setYRulePerLabel} />
    </div>
  </>)
}