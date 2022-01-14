import { TextField } from "../Control/Field/TextField"
import { IStictionRaw } from "../Graph/Bowing/Stiction"
import cl from "./ParameterPanel.module.scss"

interface IStictionParameterPanelProp {
  stictionRaw: IStictionRaw
  setStictionRaw: (stictionRaw: IStictionRaw) => void
}
export function StictionParameterPanel({
  stictionRaw, setStictionRaw
}: IStictionParameterPanelProp) {

  function setY0(y0: string) { setStictionRaw({...stictionRaw, y0}) }
  function setX1(x1: string) { setStictionRaw({...stictionRaw, x1}) }
  function setX2(x2: string) { setStictionRaw({...stictionRaw, x2}) }
  function setY1(y1: string) { setStictionRaw({...stictionRaw, y1}) }
  function setY2(y2: string) { setStictionRaw({...stictionRaw, y2}) }
  function setLineWidth(lineWidth: string) { setStictionRaw({...stictionRaw, lineWidth}) }

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="y0" value={stictionRaw.y0} setValue={setY0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x1" value={stictionRaw.x1} setValue={setX1} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y1" value={stictionRaw.y1} setValue={setY1} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x2" value={stictionRaw.x2} setValue={setX2} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y2" value={stictionRaw.y2} setValue={setY2} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="line thickness" value={stictionRaw.lineWidth} setValue={setLineWidth} />
      </div>
    </div>
  </>)
}