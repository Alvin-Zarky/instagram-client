import { User } from "./authentication"

export interface Post{
  id: number,
  text: string,
  media: string[],
  likes: PostPartial[],
  comments: PostPartial[],
  tags: any[],
  user: User,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
  remove:() => void 
}

export interface PostPartial{
  id:number,
  name: string,
  email: string,
  photo:string,
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

// export interface PostBlog{
//   id:number,
//   comments:PostPartial[],
//   likes:PostPartial[],
//   userId: number,
//   createdAt: Date,
//   updatedAt: Date
// }