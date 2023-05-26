import { API_POST } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"

const deletePost = async (id:number) =>{
  const response= await customAxios.delete(`${API_POST}/${id}`)
  const {data} = response.data
  if(data) return data
}

export {
  deletePost
}