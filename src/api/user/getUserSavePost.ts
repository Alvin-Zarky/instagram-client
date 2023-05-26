import { API_POST } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { Post } from "../../types/post"

const getUserSavePost = async (): Promise<Post[] | undefined> =>{
  const response= await customAxios.get(`${API_POST}/save`)
  const {data} = response.data

  if(data) return data
}

export {
  getUserSavePost
}