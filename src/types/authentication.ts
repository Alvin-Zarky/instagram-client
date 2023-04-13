
export interface User{
  id?: number,
  name?: string,
  email?: string,
  password?: string,
  role?: string,
  isAdmin?:boolean,
  isActive?: boolean,
  photo?: string,
  posts?:number,
  follower?:number,
  following?:number,
  bio?:string,
  links?:string,
  createdAt?:Date,
  updatedAt?:Date,
  token?:string
}

export interface InitialState{
  user: User | null,
  isLoading: boolean,
  isError:boolean,
  isSuccess:boolean,
  message: string
}

export interface PropAuthScreen{
  isSignUp:boolean,
}

export interface HelmetBar{
  title: string
}

export interface AuthObjectValues{
  name?:string
  user:string,
  password: string
}

export type AuthRTKTypes={
  user:null,
  isLoading:boolean,
  isSuccess:boolean,
  isError:boolean,
  message: string
}