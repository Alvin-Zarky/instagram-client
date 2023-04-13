import { useMutation, useQueryClient } from "react-query"
import { updatePostComment, updatePostLike } from "../../api/post/updatePost"
import { UpdateCommentInPost, UpdateLikeInPost } from "../../types/post"

export const useUpdateCommentPost = () =>{
  const queryClient= useQueryClient()
  return useMutation({
    mutationKey:["updatePostComment"],
    mutationFn:(values: UpdateCommentInPost) => updatePostComment(values),
    onSuccess:(data) =>{
      queryClient.refetchQueries(["getAllPost"])
    }
  })
}

export const useUpdateLikePost = () =>{
  const queryClient= useQueryClient()
  return useMutation({
    mutationKey:["updatePostLike"],
    mutationFn:(values: UpdateLikeInPost) => updatePostLike(values),
    onSuccess:() =>{
      queryClient.refetchQueries(["getAllPost"])
    }
  })
}
