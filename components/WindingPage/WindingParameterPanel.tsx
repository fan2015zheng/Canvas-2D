import { TextField } from "../Control/Field/TextField"
import { IClosedCurveRaw } from "../Graph/Winding/ClosedCurve"
import { IWindingRaw } from "../Graph/Winding/Winding"
import cl from "./ParameterPanel.module.scss"

interface IWindingParameterPanelProp {
  curveRaw: IClosedCurveRaw
  windingRaw: IWindingRaw
  setWindingRaw: (windingRaw: IWindingRaw) => void
  setCurveRaw: (curveRaw: IClosedCurveRaw) => void
}
export function WindingParameterPanel({
  curveRaw, setCurveRaw,
  windingRaw, setWindingRaw
}: IWindingParameterPanelProp) {

  function setExpressionF(expressionF: string) { setWindingRaw({...windingRaw, expressionF}) }
  function setExpressionG(expressionG: string) { setWindingRaw({...windingRaw, expressionG}) }
  function setFormatPoints(formatPoints: string) { setCurveRaw({...curveRaw, formatPoints}) }
  function setTwoPointSteps(twoPointSteps: string) { setCurveRaw({...curveRaw, twoPointSteps}) }
  function setCurveSteps(curveSteps: string) { setWindingRaw({...windingRaw, curveSteps}) }
  function setArrowLength(arrowLength: string) { setWindingRaw({...windingRaw, arrowLength}) }
  function setArrowWidth(arrowWidth: string) { setWindingRaw({...windingRaw, arrowWidth}) }
  function setLineWidth(lineWidth: string) { setCurveRaw({...curveRaw, lineWidth})}

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="dx/dt" value={windingRaw.expressionF} setValue={setExpressionF} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="dy/dt" value={windingRaw.expressionG} setValue={setExpressionG} />
      </div>
      <div className={cl.fieldDivLong}>
        <TextField prompt="| separated points" value={curveRaw.formatPoints} setValue={setFormatPoints} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="steps (2 points)" value={curveRaw.twoPointSteps} setValue={setTwoPointSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="trace steps" value={windingRaw.curveSteps} setValue={setCurveSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Arrow Length" value={windingRaw.arrowLength} setValue={setArrowLength} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Arrow Width" value={windingRaw.arrowWidth} setValue={setArrowWidth} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="curive thickness" value={curveRaw.lineWidth} setValue={setLineWidth} />
      </div>
    </div>
  </>)
}