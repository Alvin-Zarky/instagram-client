import { API_USER } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { User } from "../../types/authentication"

const getAccountUserByName = async (username: string): Promise<User | undefined> =>{
  const response= await customAxios.get(`${API_USER}/account/${username}`)
  const {data}= response.data

  if(data) return data
}

export{
  getAccountUserByName
}