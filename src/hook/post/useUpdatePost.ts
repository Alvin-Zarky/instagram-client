import { useMutation, useQueryClient } from "react-query"
import { updatePostComment, updatePostLike } from "../../api/post/updatePost"
import { Post, UpdateCommentInPost, UpdateLikeInPost } from "../../types/post"
import { useAppDispatch } from "../../app/hooks"
import { setPostService } from "../../features/post/postService"

export const useUpdateCommentPost = () =>{
  const queryClient= useQueryClient()
  const dispatch= useAppDispatch()
  return useMutation({
    mutationKey:["updatePostComment"],
    mutationFn:(values: UpdateCommentInPost) => updatePostComment(values),
    onSuccess:(data: Post | undefined) =>{

      // console.log(data)
      queryClient.refetchQueries(["getAllPost"])
      queryClient.refetchQueries(["getPostUser"])
      queryClient.refetchQueries(["getUserSavePost"])
      // queryClient.invalidateQueries({ queryKey: ["getUserSavePost"] })
      queryClient.refetchQueries(["getPostByAccount"])
      // queryClient.refetchQueries(["getAllNotification"])
      // queryClient.refetchQueries(["getSinglePost"])
      // queryClient.refetchQueries(["getSinglePost", data?.id])
      dispatch(setPostService(data ?? {}))
    }
  })
}

export const useUpdateLikePost = () =>{
  const queryClient= useQueryClient()
  const dispatch= useAppDispatch()
  return useMutation({
    mutationKey:["updatePostLike"],
    mutationFn:(values: UpdateLikeInPost) => updatePostLike(values),
    onSuccess:(data: Post) =>{

      // console.log(data)
      queryClient.refetchQueries(["getAllPost"])
      queryClient.refetchQueries(["getPostUser"])
      queryClient.refetchQueries(["getUserSavePost"])
      queryClient.invalidateQueries({ queryKey: ["getUserSavePost"] })
      queryClient.refetchQueries(["getPostByAccount"])
      // queryClient.refetchQueries(["getAllNotification"])
      // queryClient.refetchQueries(["getSinglePost"])
      // queryClient.refetchQueries(["getSinglePost", data.id])
      dispatch(setPostService(data as Post))
    }
  })
}
