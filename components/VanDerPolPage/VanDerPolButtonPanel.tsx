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

  function ChangeCapacitance(dC: number) {
    if(vanDerPolRaw.C === undefined || isNaN(+vanDerPolRaw.C)) return
    if(+vanDerPolRaw.C + dC < Number.EPSILON) return
    const C = Math.round((+vanDerPolRaw.C + dC)*1000)/1000
    setVanDerPolRaw({...vanDerPolRaw, C})
  }
  function CPlus() { ChangeCapacitance(0.1) }
  function CMinus() { ChangeCapacitance(-0.1) }

  return(<>
    <div className={cl.buttons}>
      <Button text="Trace" onClick={AddSteps}/>
      <Button text="Capacitance ↑" onClick={CPlus}/>
      <Button text="Capacitance ↓" onClick={CMinus}/>
    </div>
  </>)
}