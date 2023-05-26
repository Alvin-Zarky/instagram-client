import { User } from "./authentication"

export interface Post{
  id?: number,
  uid?:string,
  text?: string,
  media?: string[],
  likes?: PostPartial[],
  comments?: PostPartial[],
  tags?: any[],
  user?: User,
  userId?: number,
  createdAt?: Date,
  updatedAt?: Date,
  postUserId?: number,
  postId?:number,
  saveBy?: PostPartial[],
  remove?:() => void 
}

export interface PostPartial{
  id:number,
  uid?:string,
  name: string,
  email: string,
  photo:string,
  isHideLike?: boolean,
  comment?:string
}

export interface BlogPost{
  id:number,
  username: string,
  createdAt?: string | Date,
  photo?: string[],
  likes?: PostPartial[],
  description?:string,
  comments?: PostPartial[],
  user: string,
  userId?: number,
  savePostUserId?:number,
  saveBy?: PostPartial[],
  activeBookMark?: boolean,
  isShowConfig?:() => void,
  isShowPopUp?:() => void,
  isHideLike?: boolean,
  isShowLike?:boolean
  // onSubmit?(e:React.FormEvent):void
  // onSubmit?:() => void
}

export interface UpdateCommentInPost{
  id:number,
  comments: PostPartial
}

export interface UpdateLikeInPost{
  id:number,
  userId:number,
  likes: PostPartial[],
}

export interface PostInititState{
  post: Post | null
}

export type ValuesCreatePost ={
  isReady?: boolean,
  fileLength?: number
}

export type CreatePostBlogValues={
  text?:string,
  media?: any[],
  likes?: PostPartial[],
  comments?: PostPartial[],
  tags?:any[]
}