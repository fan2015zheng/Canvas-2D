import { Button } from "../Control/Button/Button"
import { IBowingRaw } from "../Graph/Bowing/Bowing"
import cl from "./BowingButtonPanel.module.scss"

interface IBowingButtonPanelProp {
  bowingRaw: IBowingRaw
  setBowingRaw: (bowingRaw: IBowingRaw) => void
}
export function BowingButtonPanel({
  bowingRaw, setBowingRaw 
}: IBowingButtonPanelProp) {

  function AddSteps() {
    if(bowingRaw.incrementalSteps === undefined || isNaN(+bowingRaw.incrementalSteps)) return
    const timeSteps = +bowingRaw.timeSteps + +bowingRaw.incrementalSteps
    setBowingRaw({...bowingRaw, timeSteps})
  }
  function RemoveSteps() {
    if(bowingRaw.incrementalSteps === undefined || isNaN(+bowingRaw.incrementalSteps)) return
    const timeSteps = +bowingRaw.timeSteps - +bowingRaw.incrementalSteps
    setBowingRaw({...bowingRaw, timeSteps})
  }

  return(<>
    <div className={cl.buttons}>
      <Button text="Trace" onClick={AddSteps}/>
      <Button text="Undo Trace" onClick={RemoveSteps}/>
    </div>
  </>)
}