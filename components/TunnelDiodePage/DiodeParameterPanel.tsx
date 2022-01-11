import { TextField } from "../Control/Field/TextField"
import { ITunnelDiodeRaw } from "../Graph/TunnelDiodeCircuit/TunnelDiode"
import cl from "./DiodeParameterPanel.module.scss"
import { CheckField } from "../Control/Field/CheckField"

interface IDiodeParameterPanelProp {
  tunnelDiodeRaw: ITunnelDiodeRaw
  setTunnelDiodeRaw: (tunnelDiodeRaw: ITunnelDiodeRaw) => void
  showSecondLine: boolean
  setShowSecondLine: (showSecondLine: boolean) => void
}
export function DiodeParameterPanel({
  tunnelDiodeRaw, setTunnelDiodeRaw,
  showSecondLine, setShowSecondLine
}: IDiodeParameterPanelProp) {

  function setX1(x1: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, x1}) }
  function setX2(x2: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, x2}) }
  function setX3(x3: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, x3}) }
  function setY1(y1: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, y1}) }
  function setY2(y2: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, y2}) }
  function setY3(y3: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, y3}) }
  function setLineWidth(lineWidth: string) { setTunnelDiodeRaw({...tunnelDiodeRaw, lineWidth}) }

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="x1" value={tunnelDiodeRaw.x1} setValue={setX1} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y1" value={tunnelDiodeRaw.y1} setValue={setY1} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x2" value={tunnelDiodeRaw.x2} setValue={setX2} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y2" value={tunnelDiodeRaw.y2} setValue={setY2} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="x3" value={tunnelDiodeRaw.x3} setValue={setX3} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="y3" value={tunnelDiodeRaw.y3} setValue={setY3} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="line thickness" value={tunnelDiodeRaw.lineWidth} setValue={setLineWidth} />
      </div>
      
      <div className={cl.fieldDiv}>
        <CheckField prompt="Show 2nd line" value={!!showSecondLine} setValue={setShowSecondLine} />
      </div>
    </div>
  </>)
}