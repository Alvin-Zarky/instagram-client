import { AuthObjectValues, User } from "../../types/authentication"
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

const getUserProfile= async():Promise<User> =>{
  const response= await customAxios.get(`${API_USER}/profile`)
  const {data}= response.data
  
  return data
  // const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null
  // try{
  //   let config = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }
  //   const response= await axios.get(`${API_USER}/profile`, config)
  //   const {data}= response.data
    
  //   if(data) return data
  // }catch(err){
  //   console.log(err)
  // }

}

export {
  userLogIn,
  userRegister,
  userLogOut,
  getUserProfile
}