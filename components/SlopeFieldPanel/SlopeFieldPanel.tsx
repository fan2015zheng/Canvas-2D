import { TextField } from "../Control/Field/TextField"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import cl from "./SlopeFieldParameterPanel.module.scss"

interface ISlopeFieldExtraRaw {
  phaseLineWidth: string | number
  incrementalSteps: string | number
}

interface IBowingSlopeFieldParameterPanelProp {
  extraRaw: ISlopeFieldExtraRaw
  setExtraRaw: (extraRaw: ISlopeFieldExtraRaw) => void
  slopeFieldRaw: ISlopeFieldRaw
  setSlopeFieldRaw: (slopeFieldRaw: ISlopeFieldRaw) => void
}
export function BowingSlopeFieldParameterPanel({
  extraRaw, setExtraRaw,
  slopeFieldRaw, setSlopeFieldRaw
}: IBowingSlopeFieldParameterPanelProp) {

  function setNeedleLength(needleLength: string) { setSlopeFieldRaw({...slopeFieldRaw, needleLength}) }
  function setNeedleWidth(needleWidth: string) { setSlopeFieldRaw({...slopeFieldRaw, needleWidth}) }
  function setGap(gap: string) { setSlopeFieldRaw({...slopeFieldRaw, gap}) }
  function setPhaseLineWidth(phaseLineWidth: string) { setExtraRaw({...extraRaw, phaseLineWidth}) }
  function setIncrementalSteps(incrementalSteps: string) { setExtraRaw({...extraRaw, incrementalSteps}) }
 
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
        <TextField prompt="Trace Width" value={extraRaw.phaseLineWidth} setValue={setPhaseLineWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Incremental Steps" value={extraRaw.incrementalSteps} setValue={setIncrementalSteps} />
      </div>
    </div>
  </>)
}