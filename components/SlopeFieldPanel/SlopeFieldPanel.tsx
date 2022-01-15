import { TextField } from "../Control/Field/TextField"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import cl from "./SlopeFieldPanel.module.scss"

export interface ISlopeFieldExtraRaw {
  phaseLineWidth: string | number
  incrementalSteps: string | number
}

interface ISlopeFieldParameterPanelProp {
  slopeFieldExtraRaw?: ISlopeFieldExtraRaw
  setSlopeFieldExtraRaw?: (slopeFieldExtraRaw: any) => void
  slopeFieldRaw: ISlopeFieldRaw
  setSlopeFieldRaw: (slopeFieldRaw: ISlopeFieldRaw) => void
}
export function SlopeFieldParameterPanel({
  slopeFieldExtraRaw, setSlopeFieldExtraRaw,
  slopeFieldRaw, setSlopeFieldRaw
}: ISlopeFieldParameterPanelProp) {

  function setNeedleLength(needleLength: string) { setSlopeFieldRaw({...slopeFieldRaw, needleLength}) }
  function setNeedleWidth(needleWidth: string) { setSlopeFieldRaw({...slopeFieldRaw, needleWidth}) }
  function setGap(gap: string) { setSlopeFieldRaw({...slopeFieldRaw, gap}) }
  function setPhaseLineWidth(phaseLineWidth: string) { 
    if(!slopeFieldExtraRaw || !setSlopeFieldExtraRaw) return
    setSlopeFieldExtraRaw({...slopeFieldExtraRaw, phaseLineWidth}) 
  }
  function setIncrementalSteps(incrementalSteps: string) {
    if(!slopeFieldExtraRaw || !setSlopeFieldExtraRaw) return
    setSlopeFieldExtraRaw({...slopeFieldExtraRaw, incrementalSteps}) 
  }
 
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
      {
        slopeFieldExtraRaw ?
        <div className={cl.fieldDiv}>
          <TextField prompt="Trace Width" value={slopeFieldExtraRaw.phaseLineWidth} setValue={setPhaseLineWidth} />
        </div>: null
      }
      {
        slopeFieldExtraRaw ?
        <div className={cl.fieldDiv}>
          <TextField prompt="Incremental Steps" value={slopeFieldExtraRaw.incrementalSteps} setValue={setIncrementalSteps} />
        </div>: null
      }
    </div>
  </>)
}