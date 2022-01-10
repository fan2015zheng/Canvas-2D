import { ICoordinateRaw } from "../Graph/Coordinate/Coordinate"
import { Canvas } from "./Canvas"
import { CoordinateParameterPanel } from "./CoordinateParameterPanel"
import cl from "./DrawingPad.module.scss"

interface IDrawingPadProp {
  coordinateRaw: ICoordinateRaw
  setCoordinateRaw: (coordinateRaw: ICoordinateRaw) => void
  Draw: (canvas: HTMLCanvasElement) => void
}
export function DrawingPad({
  coordinateRaw, setCoordinateRaw, Draw
}:IDrawingPadProp) {
  return (<>
    <div className={cl.drawingPad}>
      <div className={cl.canvasDiv}>
        <Canvas coordinateRaw={coordinateRaw} Draw={Draw}/>
      </div>
      <div className={cl.coordinateControlPanelDiv}>
        <CoordinateParameterPanel coordinateRaw={coordinateRaw} setCoordinateRaw={setCoordinateRaw}/>
      </div>
    </div>
  </>)
}