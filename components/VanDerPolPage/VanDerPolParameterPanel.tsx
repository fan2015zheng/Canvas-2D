import { CheckField } from "../Control/Field/CheckField"
import { TextField } from "../Control/Field/TextField"
import { IVanDerPolRaw } from "../Graph/VanDerPol/VanDerPol"
import cl from "./VanDerPolParameterPanel.module.scss"

interface IVanDerPolParameterPanelProp {
  vanDerPolRaw: IVanDerPolRaw
  setVanDerPolRaw: (vanDerPolRaw: IVanDerPolRaw) => void
}
export function VanDerPolParameterPanel({
  vanDerPolRaw, setVanDerPolRaw
}: IVanDerPolParameterPanelProp) {

  function setAlpha(alpha: string) { setVanDerPolRaw({...vanDerPolRaw, alpha}) }
  function setC(C: string) { setVanDerPolRaw({...vanDerPolRaw, C}) }
  function setL(L: string) { setVanDerPolRaw({...vanDerPolRaw, L}) }
  function setLineWidth(lineWidth: string) { setVanDerPolRaw({...vanDerPolRaw, lineWidth}) }
  function setTimeStep(timeStep: string) { setVanDerPolRaw({...vanDerPolRaw, timeStep}) }
  function setVoltageC0(voltageC0: string) { setVanDerPolRaw({...vanDerPolRaw, voltageC0}) }
  function setCurrentL0(currentL0: string) { setVanDerPolRaw({...vanDerPolRaw, currentL0}) }
  function setTimeSteps(timeSteps: string) { setVanDerPolRaw({...vanDerPolRaw, timeSteps}) }
  function setUseTimeSteps(useTimeSteps: boolean) { setVanDerPolRaw({...vanDerPolRaw, useTimeSteps}) }
  
  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="Resistence alpha" value={vanDerPolRaw.alpha} setValue={setAlpha} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Capacitance" value={vanDerPolRaw.C} setValue={setC} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Inductance" value={vanDerPolRaw.L} setValue={setL} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="V0" value={vanDerPolRaw.voltageC0} setValue={setVoltageC0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="I0" value={vanDerPolRaw.currentL0} setValue={setCurrentL0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="t step" value={vanDerPolRaw.timeStep} setValue={setTimeStep} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="steps" value={vanDerPolRaw.timeSteps} setValue={setTimeSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="line thickness" value={vanDerPolRaw.lineWidth} setValue={setLineWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <CheckField prompt="Use steps" value={vanDerPolRaw.useTimeSteps} setValue={setUseTimeSteps} />
      </div>
    </div>
  </>)
}