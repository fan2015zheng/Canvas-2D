import cl from "./TextField.module.scss"

export function TextField({ prompt, value, setValue }) {
  return(<>
    <div className={cl.field}>
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