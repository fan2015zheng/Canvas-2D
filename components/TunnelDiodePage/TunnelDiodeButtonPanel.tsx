import { useState } from "react";
import { Button } from "../Control/Button/Button";
import { TextField } from "../Control/Field/TextField";
import { ITunnelDiodeCircuitRaw } from "../Graph/TunnelDiodeCircuit/TunnelDiodeCircuit";
import cl from "./TunnelDiodeButtonPanel.module.scss"

interface ITunnelDiodeButtonPanelProp {
  circuitRaw: ITunnelDiodeCircuitRaw
  setCircuitRaw: (circuitRaw: ITunnelDiodeCircuitRaw) => void
}
export function TunnelDiodeButtonPanel({
  circuitRaw, setCircuitRaw
}: ITunnelDiodeButtonPanelProp) {

  const [dE, setDE] = useState<number>(10)

  function EPlus() {
    EChange(dE)
  }
  function EMinus() {
    EChange(-dE)
  } 

  function EChange(dE: number) {
    if(dE === undefined || isNaN(dE)) return
    if(circuitRaw.E === undefined || isNaN(+circuitRaw.E)) return
    
    const E = +circuitRaw.E + +dE
    setCircuitRaw({...circuitRaw, E})
  }

  
  return(<>
    <div className={cl.buttons}>
      <TextField prompt="△ Battery Voltage" value={dE} setValue={setDE} width={100}/>
      <Button text="Battery Voltage ↑" onClick={EPlus}/>
      <Button text="Battery Voltage ↓" onClick={EMinus}/>
    </div>
  </>)
}