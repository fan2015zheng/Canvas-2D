import cl from "./Button.module.scss"

export function Button({text, onClick}) {
  return(<>
    <button className={cl.button} onClick={onClick} > 
      {text}
    </button>
  </>)
}