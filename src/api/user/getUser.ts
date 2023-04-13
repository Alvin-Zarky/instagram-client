import { API_USER } from "../../config/env";
import { customAxios } from "../../lib/axiosConfig";
import { User } from "../../types/authentication";

const getAllUser = async(): Promise<User[] | undefined> =>{
  const response= await customAxios.get(`${API_USER}/all`)
  const {data} = response.data

  if(data) return data as User[]
}

export {
  getAllUser
}