import { API_POST } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { CreatePostBlogValues, Post } from "../../types/post"

const createPostBlog= async (values:CreatePostBlogValues):Promise<Post | undefined> =>{
  try{
    const response= await customAxios.post(`${API_POST}`, values)
    const {data}= response.data
    if(data) return data

  }catch(err){
    console.log(err)
    return undefined
  }
}

export {
  createPostBlog
}