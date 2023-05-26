import { useMutation, useQueryClient } from "react-query"
import { savePostUser } from "../../api/post/savePostUser"
import { Post } from "../../types/post"

const useSavePostUser = () =>{
  const queryClient= useQueryClient()
  return useMutation({
    mutationKey:["savePostUser"],
    mutationFn:(id:number) => savePostUser(id),
    onSuccess:(data:Post) =>{

      // console.log(data)
      queryClient.refetchQueries(["getAllPost"])
      queryClient.refetchQueries(["getPostUser"])
      queryClient.refetchQueries(["getUserSavePost"])
      // queryClient.invalidateQueries({ queryKey: ["getUserSavePost"] })
      queryClient.refetchQueries(["getPostByAccount"])
      // queryClient.refetchQueries(["getSinglePost"])
      // queryClient.refetchQueries(["getSinglePost", data.id])
    } 
  })
}

export {
  useSavePostUser
}