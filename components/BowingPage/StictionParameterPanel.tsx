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
  function setY1(y1: string) { setStictionRaw({...stictionRaw, y1}) }
  function setLineWidth(lineWidth: string) { setStictionRaw({...stictionRaw, lineWidth}) }
  function setStep(step: string) { setStictionRaw({...stictionRaw, step}) }

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
        <TextField prompt="line thickness" value={stictionRaw.lineWidth} setValue={setLineWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="step" value={stictionRaw.step} setValue={setStep} />
      </div>
    </div>
  </>)
}