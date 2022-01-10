import { TextField } from "../Control/Field/TextField"
import cl from "./ParameterPanel.module.scss"
import LogisticMap from "../Graph/LogisticMap/LogisticMap"

interface IParameterPanelProp {
  logisticMap: LogisticMap,
  setLogisticMap: (logisticMap: LogisticMap) => void
}

export function ParameterPanel({
  logisticMap,
  setLogisticMap
}: IParameterPanelProp) {

  function setLogisticH(value: number) {
    logisticMap.h = +value
    setLogisticMap(logisticMap.Copy())
  }
  function setLogisticX0(value: number) {
    logisticMap.x0 = +value
    setLogisticMap(logisticMap.Copy())
  }
  function setPointRadius(value: number) {
    logisticMap.pointRadius = +value
    setLogisticMap(logisticMap.Copy())
  }
  

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="Parameter h" value={logisticMap.h} setValue={setLogisticH} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Initial x0" value={logisticMap.x0} setValue={setLogisticX0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Point Radius" value={logisticMap.pointRadius} setValue={setPointRadius} />
      </div>
    </div>
  </>)
}
