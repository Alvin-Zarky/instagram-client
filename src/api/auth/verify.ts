import { API_USER } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { User } from "../../types/authentication"
import { ValuesToken, VerifyValues } from "../../types/user"

const verifiedEmail = async (value: ValuesToken)=>{
  const response= await customAxios.get(`${API_USER}/account/isVerified/${value.token}`)
  const {data} = response.data

  localStorage.setItem("token", JSON.stringify(data.token))
  return data as User
}

const resendEmailVerification= async (values: VerifyValues): Promise<User> =>{
  const response= await customAxios.put(`${API_USER}/account/isVerified/resend/`, {
    id: values.id,
    email:values.email 
  })
  const {data}= response.data
  return data
}

export {
  verifiedEmail,
  resendEmailVerification
}