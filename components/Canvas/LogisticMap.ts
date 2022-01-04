
export default class LogisticMap {
  h: number = 1
  x0: number = 0.5
  f: (x: number)=>number = (x: number)=> this.h*x*(1-x)

  constructor(h: number, x0: number) {
    if(!IsLogisticValid(h, x0)) {
      return
    }
    this.h = +h
    this.x0 = +x0
    this.f = (x: number)=> this.h*x*(1-x)
  }
}

export function IsLogisticValid(h: number, x0: number) {
  if(h<0 || h>4) return false
  if(x0<0 || x0>1) return false
  return true
}