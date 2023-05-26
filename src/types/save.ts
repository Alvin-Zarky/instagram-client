import { User } from "./authentication";
import { Post } from "./post";

export interface SavePost{
  id?: number,
  userId?:number,
  postId?:number,
  savePostUserId?:number,
  user?:User,
  post?:Post,
  createdAt?: Date
}