
export interface MenuListRouter{
  title:string,
  link: any,
  from: any,
  to:any
}

export interface BoxUserProfileStory{
  title: string,
  image: string
}

export interface BoxUserSuggest{
  username: string,
  user: string
}

export interface BoxPostSetting{
  showPopUp: VoidFunction,
  onDeletePost: Function,
  isYourPost: boolean
}