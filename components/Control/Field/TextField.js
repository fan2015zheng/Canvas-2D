import cl from "./TextField.module.scss"

export function TextField({ prompt, value, setValue, width = 0}) {

  const style = {}
  if(width) {
    style.width = width + "px"
  }
  return(<>
    <div className={cl.field} style={style}>
      <div className={cl.labelDiv}>
        <label>{prompt}</label>
      </div>
      <div >
        <input className={cl.input}
          value={value} onChange={(e)=>{setValue(e.target.value)}}/>
      </div>
    </div>
  </>)
}