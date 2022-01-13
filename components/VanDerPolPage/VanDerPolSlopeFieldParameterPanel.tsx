import { TextField } from "../Control/Field/TextField"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import { IVanDerPolRaw } from "../Graph/VanDerPol/VanDerPol"
import cl from "./VanDerPolParameterPanel.module.scss"

interface IVanDerPolSlopeFieldParameterPanelProp {
  vanDerPolRaw: IVanDerPolRaw
  setVanDerPolRaw: (vanDerPolRaw: IVanDerPolRaw) => void
  slopeFieldRaw: ISlopeFieldRaw
  setSlopeFieldRaw: (slopeFieldRaw: ISlopeFieldRaw) => void
}
export function VanDerPolSlopeFieldParameterPanel({
  vanDerPolRaw, setVanDerPolRaw,
  slopeFieldRaw, setSlopeFieldRaw
}: IVanDerPolSlopeFieldParameterPanelProp) {

  function setNeedleLength(needleLength: string) { setSlopeFieldRaw({...slopeFieldRaw, needleLength}) }
  function setNeedleWidth(needleWidth: string) { setSlopeFieldRaw({...slopeFieldRaw, needleWidth}) }
  function setGap(gap: string) { setSlopeFieldRaw({...slopeFieldRaw, gap}) }
  function setPhaseLineWidth(phaseLineWidth: string) { setVanDerPolRaw({...vanDerPolRaw, phaseLineWidth}) }
  function setIncrementalSteps(incrementalSteps: string) { setVanDerPolRaw({...vanDerPolRaw, incrementalSteps}) }
 
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
        <TextField prompt="Trace Width" value={vanDerPolRaw.phaseLineWidth} setValue={setPhaseLineWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Incremental Steps" value={vanDerPolRaw.incrementalSteps} setValue={setIncrementalSteps} />
      </div>
    </div>
  </>)
}