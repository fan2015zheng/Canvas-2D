import { TextField } from "../Control/Field/TextField"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import { IBowingRaw } from "../Graph/Bowing/Bowing"
import cl from "./ParameterPanel.module.scss"

interface IBowingSlopeFieldParameterPanelProp {
  bowingRaw: IBowingRaw
  setBowingRaw: (bowingRaw: IBowingRaw) => void
  slopeFieldRaw: ISlopeFieldRaw
  setSlopeFieldRaw: (slopeFieldRaw: ISlopeFieldRaw) => void
}
export function BowingSlopeFieldParameterPanel({
  bowingRaw, setBowingRaw,
  slopeFieldRaw, setSlopeFieldRaw
}: IBowingSlopeFieldParameterPanelProp) {

  function setNeedleLength(needleLength: string) { setSlopeFieldRaw({...slopeFieldRaw, needleLength}) }
  function setNeedleWidth(needleWidth: string) { setSlopeFieldRaw({...slopeFieldRaw, needleWidth}) }
  function setGap(gap: string) { setSlopeFieldRaw({...slopeFieldRaw, gap}) }
  function setPhaseLineWidth(phaseLineWidth: string) { setBowingRaw({...bowingRaw, phaseLineWidth}) }
  function setIncrementalSteps(incrementalSteps: string) { setBowingRaw({...bowingRaw, incrementalSteps}) }
 
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
        <TextField prompt="Trace Width" value={bowingRaw.phaseLineWidth} setValue={setPhaseLineWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Incremental Steps" value={bowingRaw.incrementalSteps} setValue={setIncrementalSteps} />
      </div>
    </div>
  </>)
}