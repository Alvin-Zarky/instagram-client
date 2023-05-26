import { Post, PostPartial } from "./post"

export interface NotificationSideUi{
  isNotification: boolean,
  setIsNotification:(b: boolean) => void,
  setIsPopUp:(b: boolean) => void,
  isActive:boolean,
  setIsCreated:(b: boolean) => void,
  setIsActive:(b: boolean) => void
}

export interface NotificationObject{
  today: NotificationData[],
  thisWeek:NotificationData[],
  thisMonth:NotificationData[]
}

export interface NotificationData{
  id?:number,
  postUID?:string,
  activity?:string,
  createdAt?:Date,
  updatedAt?:Date,
  userId?:number,
  postId?:number,
  user: PostPartial,
  post: Post
}