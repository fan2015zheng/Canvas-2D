import { TextField } from "../Control/Field/TextField"
import cl from "./ParameterPanel.module.scss"
import { ILogisticMapRaw } from "../Graph/LogisticMap/LogisticMap"

interface IParameterPanelProp {
  logisticMapRaw: ILogisticMapRaw,
  setLogisticMapRaw: (logisticMapRaw: ILogisticMapRaw) => void
}

export function ParameterPanel({
  logisticMapRaw,
  setLogisticMapRaw
}: IParameterPanelProp) {

  function setH(h: string) { setLogisticMapRaw({...logisticMapRaw, h}) }
  function setX0(x0: string) { setLogisticMapRaw({...logisticMapRaw, x0}) }
  function setPointRadius(pointRadius: string) { setLogisticMapRaw({...logisticMapRaw, pointRadius}) }

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="Parameter h" value={logisticMapRaw.h} setValue={setH} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Initial x0" value={logisticMapRaw.x0} setValue={setX0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Point Radius" value={logisticMapRaw.pointRadius} setValue={setPointRadius} />
      </div>
    </div>
  </>)
}
