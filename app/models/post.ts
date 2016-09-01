import {Account} from "./account";
import {Station} from "./station";

export interface Post {
  id:string,
  creator:Account,
  shift:Number
  department:string,
  station:Station,
  isTrade:boolean
  isOvertime:boolean
  isAssignedHire:boolean,
  isRegular:boolean,
  requestType:string,
  shiftStartTime:string,
  platoon:string,
  created:Number
}
