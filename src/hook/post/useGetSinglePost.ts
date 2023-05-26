import { useQuery } from "react-query"
import { getPostByAccountUser, getSinglePost } from "../../api/post/getSinglePost"

const useGetSinglePost = (id:number) =>{
  return useQuery({
    enabled: id !== null,
    retry:false,
    queryKey:["getSinglePost", id],
    queryFn:() => getSinglePost(id),
    refetchInterval: 1000
  })
}

const useGetPostByAccount = (username:string) =>{
  return useQuery({
    queryKey: ["getPostByAccount", username],
    queryFn:() => getPostByAccountUser(username),
    // retry:false,
    enabled: username !== ''
  })
}

export {
  useGetSinglePost,
  useGetPostByAccount
}