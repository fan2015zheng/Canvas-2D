import { useEffect, useState } from 'react'
import Coordinate from "../Graph/Coordinate/Coordinate"
import LogisticMap, { IsLogisticMapValid } from "../Graph/LogisticMap/LogisticMap"
import { Button } from "../Control/Button/Button"

interface IButtonPanelProp {
  coordinate: Coordinate,
  setCoordinate: (coordinate: Coordinate) => void
  logisticMap: LogisticMap,
  setLogisticMap: (logisticMap: LogisticMap) => void
}

export function ButtonPanel({
  coordinate, setCoordinate, logisticMap, setLogisticMap
}: IButtonPanelProp) {
  
  const [redraw, setRedraw]= useState(false)

  const onClickApply = ()=>{
    if(
      coordinate.IsValid() && logisticMap.IsValid()
    ) {
      setCoordinate(coordinate.Copy())
      setLogisticMap(logisticMap.Copy())
    } else {
      alert("Parameters are not valid")
    }
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
  
    if(step > 0 && logisticMap.h !== undefined && logisticMap.h > 4 - Number.EPSILON) {
      return
    }
    if(step < 0 && logisticMap.h !== undefined && logisticMap.h < Number.EPSILON) {
      return
    }
    logisticMap.h = logisticMap.h || 0
    let newValue = Math.round((+logisticMap.h + step)*100)/100
    if(newValue > 4) {
      newValue = 4
    }
    if(newValue < 0) {
      newValue = 0
    }
    setLogisticMap(logisticMap.Copy())
    setRedraw(true)
  }

  useEffect(()=> {
    if(!redraw) return
    setRedraw(false)
    onClickApply()
  })

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
