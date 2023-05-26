import { API_POST } from "../../config/env";
import { customAxios } from "../../lib/axiosConfig";
import { Post } from "../../types/post";

const getAllPost = async (): Promise<Post[] | undefined> =>{

  const response= await customAxios.get(`${API_POST}`)
  const {data} = response.data
  
  if(data) return data
}

const getAllPostOnScroll = async (page:number, limit:number) =>{
  const response= await customAxios.get(`${API_POST}?page=${page}&limit=${limit}`)
  const {data} = response

  return data
}

const getAllPostByUser= async (): Promise<Post[] | undefined> =>{
  try{
    const response= await customAxios.get(`${API_POST}/myPost`)
    const {data} = response.data
    
    return data
  } catch(err){
    return undefined
  }
}

export {
  getAllPost,
  getAllPostOnScroll,
  getAllPostByUser
}