import { API_POST } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"

const savePostUser= async (id:number) =>{
  const response = await customAxios.post(`${API_POST}/${id}/save`, {})
  const {data} = response.data

  if(data) return data
}

export {
  savePostUser
}