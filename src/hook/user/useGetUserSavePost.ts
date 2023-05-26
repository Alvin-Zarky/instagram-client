import { useQuery } from "react-query"
import { getUserSavePost } from "../../api/user/getUserSavePost"

const useGetUserSavePost = () =>{
  return useQuery({
    queryKey: ["getUserSavePost"],
    queryFn:() => getUserSavePost(),
    retry:false,
    refetchInterval:1000
  })
}

export {
  useGetUserSavePost
}