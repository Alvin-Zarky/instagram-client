
export interface User{
  id?: number,
  uid?: string,
  name?: string,
  email?: string,
  password?: string,
  role?: string,
  isAdmin?:boolean,
  isActive?: boolean,
  photo?: string,
  posts?:number,
  photoDetail?: PhotoDetail,
  follower?:number,
  following?:number,
  bio?:string,
  links?:string,
  isHideLike?:boolean,
  isVerified?:boolean,
  verifiedToken?:string,
  verifiedExpired?:Date,
  createdAt?:Date,
  updatedAt?:Date,
  token?:string
}

export interface PhotoDetail{
  public_id?: string,
  delete_by_token?: string
}

export interface InitialStateAuth{
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

export type TokenParam ={
  token: string
}

export type ResetPasswordValues={
  token: string,
  newPassword: string,
  confirmNewPassword: string
}
