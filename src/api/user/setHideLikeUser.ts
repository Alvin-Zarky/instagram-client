import { API_USER } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { User } from "../../types/authentication"

const setHideLikeUser = async (hideLike: boolean): Promise<User | undefined> =>{

  const url= await customAxios.put(`${API_USER}/changeHideLike`, {
    hideLike
  })
  const { data }= url.data

  if(data) return data
}
export{
  setHideLikeUser
}