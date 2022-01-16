import { Button } from "../Control/Button/Button"
import { ILinearizationRaw } from "../Graph/Linearization/Linearization"
import cl from "./LinearizationButtonPanel.module.scss"

interface ILinearizationButtonPanelProp {
  linearizationRaw: ILinearizationRaw
  setLinearizationRaw: (linearizationRaw: ILinearizationRaw) => void
}
export function LinearizationButtonPanel({
  linearizationRaw, setLinearizationRaw 
}: ILinearizationButtonPanelProp) {

  function AddSteps() {
    if(linearizationRaw.incrementalSteps === undefined || isNaN(+linearizationRaw.incrementalSteps)) return
    const timeSteps = +linearizationRaw.timeSteps + +linearizationRaw.incrementalSteps
    setLinearizationRaw({...linearizationRaw, timeSteps})
  }
  function RemoveSteps() {
    if(linearizationRaw.incrementalSteps === undefined || isNaN(+linearizationRaw.incrementalSteps)) return
    const timeSteps = +linearizationRaw.timeSteps - +linearizationRaw.incrementalSteps
    setLinearizationRaw({...linearizationRaw, timeSteps})
  }

  return(<>
    <div className={cl.buttons}>
      <Button text="Trace ↑↓" onClick={AddSteps}/>
      <Button text="Undo Trace" onClick={RemoveSteps}/>
    </div>
  </>)
}