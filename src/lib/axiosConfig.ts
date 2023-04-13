import axios, { InternalAxiosRequestConfig} from "axios"
import Storage from "../utility/storage"
import { API_URL } from "../config/env"

const authRequest= (config:InternalAxiosRequestConfig) =>{
  config.headers = config.headers ?? {}

  const storage= new Storage("token")
  if(storage.getItem()){
    config.headers.Authorization = `Bearer ${storage.getItem()}`
  }
  
  return config
}

export const customAxios = axios.create({
  baseURL: API_URL
})

customAxios.interceptors.request.use(authRequest)
customAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return Promise.reject(message)
  }
)
