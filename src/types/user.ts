import { User } from "./authentication"

export interface UserEditProfile{
  name: string,
  email: string,
  website:string,
  bio: string,
  photo:string
}

export interface UserEditPassword{
  currentPassword: string,
  password: string
}

export interface ValuesToken{
  token:string
}

export interface UserVerify{
  verifyUser: User
}

export interface VerifyValues{
  id?:number,
  email?:string
}