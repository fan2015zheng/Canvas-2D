import { Button } from "../Control/Button/Button"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import cl from "./VanDerPolButtonPanel.module.scss"

interface IVanDerPolButtonPanelProp {
  slopeFieldRaw: ISlopeFieldRaw
  setSlopeFieldRaw: (slopeFieldRaw: ISlopeFieldRaw) => void
}
export function VanDerPolButtonPanel({
  slopeFieldRaw, setSlopeFieldRaw
}: IVanDerPolButtonPanelProp) {


  function AddSteps() {
    if(slopeFieldRaw.incrementalSteps === undefined || isNaN(+slopeFieldRaw.incrementalSteps)) return
    const steps = +slopeFieldRaw.steps + +slopeFieldRaw.incrementalSteps
    setSlopeFieldRaw({...slopeFieldRaw, steps})
  }

  
  return(<>
    <div className={cl.buttons}>
      <Button text="Trace ↑" onClick={AddSteps}/>
    </div>
  </>)
}