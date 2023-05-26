import { API_POST } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { Post, UpdateCommentInPost, UpdateLikeInPost } from "../../types/post"

const updatePostComment = async({id, comments}: UpdateCommentInPost): Promise<Post | undefined> =>{
  const response= await customAxios.put(`${API_POST}/${id}`, { comments:[comments], likes:[] })
  const {data} = response.data

  if(data) return data
}

const updatePostLike = async ({id, likes}: UpdateLikeInPost)=>{
  const response= await customAxios.put(`${API_POST}/${id}`, { comments: [], likes })
  const {data} = response.data

  if(data) return data
}

export {
  updatePostComment,
  updatePostLike
}