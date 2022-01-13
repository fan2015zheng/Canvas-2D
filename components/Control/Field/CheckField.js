import cl from "./CheckField.module.scss"

export function CheckField({ prompt, value, setValue }) {
  return(<>
    <div className={cl.field}>
      <div className={cl.labelDiv}>
        <label>{prompt}</label>
      </div>
      <div >
        <input className={cl.input} type="checkbox"
          value={value} onChange={()=>{
            setValue(!value)}}/>
      </div>
    </div>
  </>)
}