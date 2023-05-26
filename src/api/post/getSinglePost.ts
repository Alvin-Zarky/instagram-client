import { API_POST } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { Post } from "../../types/post"

const getSinglePost = async(id:number):Promise<Post | undefined> =>{
  const response= await customAxios.get(`${API_POST}/${id}`)

  const {data}= response.data
  if(data) return data
}

const getPostByAccountUser = async (name:string) =>{
  const response= await customAxios.get(`${API_POST}/account/${name}`)
  const {data}= response.data

  if(data) return data
}

export {
  getSinglePost,
  getPostByAccountUser
}