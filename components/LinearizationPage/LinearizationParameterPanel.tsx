import { CheckField } from "../Control/Field/CheckField"
import { TextField } from "../Control/Field/TextField"
import { ILinearizationRaw } from "../Graph/Linearization/Linearization"
import cl from "./ParameterPanel.module.scss"

interface ILinearizationParameterPanelProp {
  linearizationRaw: ILinearizationRaw
  setLinearizationRaw: (linearizationRaw: ILinearizationRaw) => void
}
export function LinearizationParameterPanel({
  linearizationRaw, setLinearizationRaw
}: ILinearizationParameterPanelProp) {


  function setExpressionF(expressionF: string) { setLinearizationRaw({...linearizationRaw, expressionF}) }
  function setExpressionG(expressionG: string) { setLinearizationRaw({...linearizationRaw, expressionG}) }
  function setA(a: string) { setLinearizationRaw({...linearizationRaw, a}) }
  function setB(b: string) { setLinearizationRaw({...linearizationRaw, b}) }
  function setC(c: string) { setLinearizationRaw({...linearizationRaw, c}) }
  function setD(d: string) { setLinearizationRaw({...linearizationRaw, d}) }
  function setX0(x0: string) { setLinearizationRaw({...linearizationRaw, x0}) }
  function setY0(y0: string) { setLinearizationRaw({...linearizationRaw, y0}) }
  function setX1(x1: string) { setLinearizationRaw({...linearizationRaw, x1}) }
  function setY1(y1: string) { setLinearizationRaw({...linearizationRaw, y1}) }
  function setX2(x2: string) { setLinearizationRaw({...linearizationRaw, x2}) }
  function setY2(y2: string) { setLinearizationRaw({...linearizationRaw, y2}) }
  function setX3(x3: string) { setLinearizationRaw({...linearizationRaw, x3}) }
  function setY3(y3: string) { setLinearizationRaw({...linearizationRaw, y3}) }
  function setTimeStep(timeStep: string) { setLinearizationRaw({...linearizationRaw, timeStep}) }
  function setTimeSteps(timeSteps: string) { setLinearizationRaw({...linearizationRaw, timeSteps}) }
  function setIncrementalSteps(incrementalSteps: string) { setLinearizationRaw({...linearizationRaw,  incrementalSteps}) }
  function setLineWidth(lineWidth: string) { setLinearizationRaw({...linearizationRaw, lineWidth}) }
  
  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="dx/dt" value={linearizationRaw.expressionF} setValue={setExpressionF} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="dy/dt" value={linearizationRaw.expressionG} setValue={setExpressionG} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="A11" value={linearizationRaw.a} setValue={setA} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="A12" value={linearizationRaw.b} setValue={setB} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="A21" value={linearizationRaw.c} setValue={setC} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="A22" value={linearizationRaw.d} setValue={setD} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x0" value={linearizationRaw.x0} setValue={setX0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y0" value={linearizationRaw.y0} setValue={setY0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x1" value={linearizationRaw.x1} setValue={setX1} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y1" value={linearizationRaw.y1} setValue={setY1} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x2" value={linearizationRaw.x2} setValue={setX2} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y2" value={linearizationRaw.y2} setValue={setY2} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x3" value={linearizationRaw.x3} setValue={setX3} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y3" value={linearizationRaw.y3} setValue={setY3} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="t step" value={linearizationRaw.timeStep} setValue={setTimeStep} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="steps" value={linearizationRaw.timeSteps} setValue={setTimeSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="incremental steps" value={linearizationRaw.incrementalSteps} setValue={setIncrementalSteps} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="line thickness" value={linearizationRaw.lineWidth} setValue={setLineWidth} />
      </div>
    </div>
  </>)
}