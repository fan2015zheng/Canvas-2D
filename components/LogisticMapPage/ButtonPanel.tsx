import { useEffect, useState } from 'react'
import Coordinate, { ICoordinateRaw } from "../Graph/Coordinate/Coordinate"
import LogisticMap, { ILogisticMapRaw } from "../Graph/LogisticMap/LogisticMap"
import { Button } from "../Control/Button/Button"

interface IButtonPanelProp {
  coordinateRaw: ICoordinateRaw,
  setCoordinateRaw: (coordinateRaw: ICoordinateRaw) => void
  logisticMapRaw: ILogisticMapRaw,
  setLogisticMapRaw: (logisticMapRaw: ILogisticMapRaw) => void
  setRedraw: (redraw: boolean) => void
}

export function ButtonPanel({
  coordinateRaw, setCoordinateRaw, logisticMapRaw, setLogisticMapRaw,
  setRedraw
}: IButtonPanelProp) {

  const onClickApply = ()=>{
    if(!Coordinate.IsValid(coordinateRaw)) {
      alert("Coordinate parameters are not valid")
    }
    if(!LogisticMap.IsValid(logisticMapRaw)) {
      alert("Logistic Map parameters are not valid")
    }
    setRedraw(true)
  }

  const hPlusFast = () => {
    hChange(0.1)
  }
  const hMinusFast = () => {
    hChange(-0.1)
  }
  const hPlus = () => {
    hChange(0.01)
  }
  const hMinus = () => {
    hChange(-0.01)
  }

  const hChange = (step: number) => {
  
    if(step > 0 && logisticMapRaw.h !== undefined && logisticMapRaw.h > 4 - Number.EPSILON) {
      return
    }
    if(step < 0 && logisticMapRaw.h !== undefined && logisticMapRaw.h < Number.EPSILON) {
      return
    }
    
    let newValue = Math.round((+logisticMapRaw.h! + step)*100)/100
    if(newValue > 4) {
      newValue = 4
    }
    if(newValue < 0) {
      newValue = 0
    }
    setLogisticMapRaw({...logisticMapRaw, h: newValue})
    setRedraw(true)
  }

  return (<>
    <div>
      <Button text="Apply" onClick={onClickApply}/>
      <Button text="h ↑" onClick={hPlus}/>
      <Button text="h ↑↑" onClick={hPlusFast}/>
      <Button text="h ↓" onClick={hMinus}/>
      <Button text="h ↓↓" onClick={hMinusFast}/>
    </div>

  </>)
}
