import { TextField } from "../Control/Field/TextField"
import { ITunnelDiodeCircuitRaw } from "../Graph/TunnelDiodeCircuit/TunnelDiodeCircuit"
import cl from "./CircuitParameterPanel.module.scss"

interface ICircuitParameterPanelProp {
  circuitRaw: ITunnelDiodeCircuitRaw
  setCircuitRaw: (circuitRaw: ITunnelDiodeCircuitRaw) => void
}
export function CircuitParameterPanel({
  circuitRaw, setCircuitRaw
}: ICircuitParameterPanelProp) {

  function setR(R: string) { setCircuitRaw({...circuitRaw, R}) }
  function setC(C: string) { setCircuitRaw({...circuitRaw, C}) }
  function setL(L: string) { setCircuitRaw({...circuitRaw, L}) }
  function setE(E: string) { setCircuitRaw({...circuitRaw, E}) }
  function setLineWidth(lineWidth: string) { setCircuitRaw({...circuitRaw, lineWidth}) }
  function setTimeStep(timeStep: string) { setCircuitRaw({...circuitRaw, timeStep}) }
  function setVoltageC0(voltageC0: string) { setCircuitRaw({...circuitRaw, voltageC0}) }
  function setCurrentL0(currentL0: string) { setCircuitRaw({...circuitRaw, currentL0}) }

  return (<>
    <div className={cl.fields}>
      <div className={cl.fieldDiv}>
        <TextField prompt="Resistence" value={circuitRaw.R} setValue={setR} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Capacitance" value={circuitRaw.C} setValue={setC} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Inductance" value={circuitRaw.L} setValue={setL} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="Batter Voltage" value={circuitRaw.E} setValue={setE} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="t step" value={circuitRaw.timeStep} setValue={setTimeStep} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="V0" value={circuitRaw.voltageC0} setValue={setVoltageC0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="I0" value={circuitRaw.currentL0} setValue={setCurrentL0} />
      </div>
      <div className={cl.fieldDiv}>
        <TextField prompt="line thickness" value={circuitRaw.lineWidth} setValue={setLineWidth} />
      </div>
    </div>
  </>)
}