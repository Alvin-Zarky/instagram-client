import { API_POST } from "../../config/env";
import { customAxios } from "../../lib/axiosConfig";
import { Post } from "../../types/post";

const getAllPost = async (): Promise<Post[] | undefined> =>{

  const response= await customAxios.get(`${API_POST}`)
  const {data} = response.data
  
  if(data) return data as Post[]
}

export {
  getAllPost
}