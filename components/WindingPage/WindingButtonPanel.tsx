import { Button } from "../Control/Button/Button"
import { IWindingRaw } from "../Graph/Winding/Winding"
import cl from "./WindingButtonPanel.module.scss"

interface IWindingButtonPanelProp {
  windingRaw: IWindingRaw
  setWindingRaw: (windingRaw: IWindingRaw) => void
}
export function WindingButtonPanel({
  windingRaw, setWindingRaw 
}: IWindingButtonPanelProp) {

  function AddSteps() {
    const curveSteps = +windingRaw.curveSteps + 1
    setWindingRaw({...windingRaw, curveSteps})
  }
  function RemoveSteps() {
    const curveSteps = +windingRaw.curveSteps - 1
    setWindingRaw({...windingRaw, curveSteps})
  }

  return(<>
    <div className={cl.buttons}>
      <Button text="Trace ↑" onClick={AddSteps}/>
      <Button text="Trace ↓" onClick={RemoveSteps}/>
    </div>
  </>)
}