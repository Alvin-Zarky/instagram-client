import { useMutation, useQueryClient } from "react-query"
import { createPostBlog } from "../../api/post/createPost"
import { CreatePostBlogValues } from "../../types/post"

export const useCreatePost = () =>{

  const queryClient= useQueryClient()
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn:(values: CreatePostBlogValues) => createPostBlog(values),
    onSuccess:(data) => {
      queryClient.refetchQueries(["getAllPost"])
      queryClient.refetchQueries(["getPostUser"])
      queryClient.refetchQueries(["getPostByAccount"])
    }
  })
}
