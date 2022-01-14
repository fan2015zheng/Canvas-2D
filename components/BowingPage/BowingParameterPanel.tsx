import { CheckField } from "../Control/Field/CheckField"
import { TextField } from "../Control/Field/TextField"
import { IBowingRaw } from "../Graph/Bowing/Bowing"
import cl from "./ParameterPanel.module.scss"

interface IBowingParameterPanelProp {
  bowingRaw: IBowingRaw
  setBowingRaw: (bowingRaw: IBowingRaw) => void
}
export function BowingParameterPanel({
  bowingRaw, setBowingRaw
}: IBowingParameterPanelProp) {

  function setM(M: string) { setBowingRaw({...bowingRaw, M}) }
  function setK(k: string) { setBowingRaw({...bowingRaw, k}) }
  function setB(b: string) { setBowingRaw({...bowingRaw, b}) }
  function setLineWidth(lineWidth: string) { setBowingRaw({...bowingRaw, lineWidth}) }
  function setTimeStep(timeStep: string) { setBowingRaw({...bowingRaw, timeStep}) }
  function setX0(x0: string) { setBowingRaw({...bowingRaw, x0}) }
  function setV0(v0: string) { setBowingRaw({...bowingRaw, v0}) }
  function setTimeSteps(timeSteps: string) { setBowingRaw({...bowingRaw, timeSteps}) }
  function setUseTimeSteps(useTimeSteps: boolean) { setBowingRaw({...bowingRaw, useTimeSteps}) }
  
  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="mass M" value={bowingRaw.M} setValue={setM} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="spring k" value={bowingRaw.k} setValue={setK} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="belt b" value={bowingRaw.b} setValue={setB} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x0" value={bowingRaw.x0} setValue={setX0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="v0" value={bowingRaw.v0} setValue={setV0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="t step" value={bowingRaw.timeStep} setValue={setTimeStep} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="steps" value={bowingRaw.timeSteps} setValue={setTimeSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="line thickness" value={bowingRaw.lineWidth} setValue={setLineWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <CheckField prompt="Use steps" value={bowingRaw.useTimeSteps} setValue={setUseTimeSteps} />
      </div>
    </div>
  </>)
}