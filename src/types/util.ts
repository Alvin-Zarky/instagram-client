import { Post } from "./post"

export type DataCloudinary ={
  secure_url?: string,
  public_id?: string,
  delete_by_token?:string,
  url?:string,
  folder?: string,
  resource_type?: string,
  version?: number,
  version_id?: string
}

export type LastPage = {
  data: Post[]
  pagination:{
    next?:{
      page?:number
    }
  }
}

export type ImagePreview={
  media: any[],
}

export type PhotoBlogPost={
  photo?: string[]
}

export type ClosePopUpFunc={
  closePopUp:() => void
}

export type UsernameParam={
  username: string,
  uid?:string
}

export type UidMessageParam={
  id?: any,
  uid?:string
}

export type FilePreview ={
  url?:string,
  type?:string,
  public_id?:string
}