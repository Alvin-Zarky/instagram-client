import { useMutation, useQueryClient } from "react-query"
import { deletePost } from "../../api/post/deletePost"

const useDeletePost = () =>{
  const queryClient= useQueryClient()
  return useMutation({
    mutationKey:["deletePost"],
    mutationFn:(id:number) => deletePost(id),
    onSuccess:() =>{
      queryClient.refetchQueries(["getAllPost"])
      queryClient.refetchQueries(["getPostUser"])
      queryClient.refetchQueries(["getUserSavePost"])
      queryClient.refetchQueries(["getPostByAccount"])
    }
  })
}

export {
  useDeletePost
}