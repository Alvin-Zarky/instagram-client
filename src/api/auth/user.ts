import { AuthObjectValues } from "../../types/authentication"
import { customAxios } from "../../lib/axiosConfig"
import { API_USER } from "../../config/env"

const userLogIn = async ({user, password}: AuthObjectValues) =>{
  const values={
    user,
    password
  }
  const response= await customAxios.post(`${API_USER}/login`, values)
  
  const {data} = response.data
  return data
}

const userRegister = async ({name, user, password}: AuthObjectValues) =>{
  
  const values={
    name,
    email: user,
    password
  }
  const response= await customAxios.post(`${API_USER}/register`, values)
  const {data} = response.data

  if(data) return data

}

const userLogOut = async () =>{

  const response= await customAxios.get(`${API_USER}/logout`)
  const {data} = response.data

  if(data) return data

}

const getUserProfile= async() =>{

  const response= await customAxios.get(`${API_USER}/profile`)
  const {data}= response.data
  
  if(data) return data

}

export {
  userLogIn,
  userRegister,
  userLogOut,
  getUserProfile
}