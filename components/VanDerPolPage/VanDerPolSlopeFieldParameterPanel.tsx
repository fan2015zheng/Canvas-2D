import { TextField } from "../Control/Field/TextField"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import cl from "./VanDerPolParameterPanel.module.scss"

interface IVanDerPolSlopeFieldParameterPanelProp {
  slopeFieldRaw: ISlopeFieldRaw
  setSlopeFieldRaw: (slopeFieldRaw: ISlopeFieldRaw) => void
}
export function VanDerPolSlopeFieldParameterPanel({
  slopeFieldRaw, setSlopeFieldRaw
}: IVanDerPolSlopeFieldParameterPanelProp) {

  function setNeedleLength(needleLength: string) { setSlopeFieldRaw({...slopeFieldRaw, needleLength}) }
  function setNeedleWidth(needleWidth: string) { setSlopeFieldRaw({...slopeFieldRaw, needleWidth}) }
  function setGap(gap: string) { setSlopeFieldRaw({...slopeFieldRaw, gap}) }
  function setX0(x0: string) { setSlopeFieldRaw({...slopeFieldRaw, x0}) }
  function setY0(y0: string) { setSlopeFieldRaw({...slopeFieldRaw, y0}) }
  function setTimeStep(timeStep: string) { setSlopeFieldRaw({...slopeFieldRaw, timeStep}) }
  function setSteps(steps: string) { setSlopeFieldRaw({...slopeFieldRaw, steps}) }
  function setIncrementalSteps(incrementalSteps: string) { setSlopeFieldRaw({...slopeFieldRaw, incrementalSteps}) }
  function setTraceWidth(traceWidth: string) { setSlopeFieldRaw({...slopeFieldRaw, traceWidth}) }

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="Needle Length" value={slopeFieldRaw.needleLength} setValue={setNeedleLength} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Needle Width" value={slopeFieldRaw.needleWidth} setValue={setNeedleWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Needle Gap" value={slopeFieldRaw.gap} setValue={setGap} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="V0" value={slopeFieldRaw.x0} setValue={setX0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="I0" value={slopeFieldRaw.y0} setValue={setY0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="t step" value={slopeFieldRaw.timeStep} setValue={setTimeStep} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="steps" value={slopeFieldRaw.steps} setValue={setSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Incremental steps" value={slopeFieldRaw.incrementalSteps} setValue={setIncrementalSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Trace Width" value={slopeFieldRaw.traceWidth} setValue={setTraceWidth} />
      </div>
    </div>
  </>)
}