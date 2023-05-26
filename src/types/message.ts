import { PostPartial } from "./post"

export interface Message{
  text?:string | any,
  uid?:string,
  uuId?:string
}

export interface UserMessage{
  id?:number,
  uid?:string,
  uRecieveText?:string,
  uSendText?:string,
  text?:any,
  user?: PostPartial,
  uUser?: PostPartial
}

export interface DeleteFileValues{
  public_id?:string,
  type?:string,
  url?:string
}

export interface ChatInitialState{
  chat: UserMessage[]
}
