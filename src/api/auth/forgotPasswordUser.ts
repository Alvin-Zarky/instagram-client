import { API_USER } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { ResetPasswordValues } from "../../types/authentication"

const forgetPasswordAuth = async (email: string) =>{
  const response= await customAxios.post(`${API_USER}/forget/password`, { email })
  const {data} = response.data

  if(data) return data
}

const resetPasswordAuth = async (values: ResetPasswordValues) =>{
  const response= await customAxios.put(`${API_USER}/reset/password/${values.token}`, {
    newPassword: values.newPassword,
    confirmNewPassword: values.confirmNewPassword
  })

  const {data}= response.data
  if(data) return data
}

export {
  forgetPasswordAuth,
  resetPasswordAuth
}