import { Button } from "../Control/Button/Button"
import { ISlopeFieldRaw } from "../Graph/SlopeField/SlopeField"
import { IVanDerPolRaw } from "../Graph/VanDerPol/VanDerPol"
import cl from "./VanDerPolButtonPanel.module.scss"

interface IVanDerPolButtonPanelProp {
  vanDerPolRaw: IVanDerPolRaw
  setVanDerPolRaw: (vanDerPolRaw: IVanDerPolRaw) => void
}
export function VanDerPolButtonPanel({
  vanDerPolRaw, setVanDerPolRaw 
}: IVanDerPolButtonPanelProp) {

  function AddSteps() {
    if(vanDerPolRaw.incrementalSteps === undefined || isNaN(+vanDerPolRaw.incrementalSteps)) return
    const timeSteps = +vanDerPolRaw.timeSteps + +vanDerPolRaw.incrementalSteps
    setVanDerPolRaw({...vanDerPolRaw, timeSteps})
  }

  return(<>
    <div className={cl.buttons}>
      <Button text="Trace ↑" onClick={AddSteps}/>
    </div>
  </>)
}