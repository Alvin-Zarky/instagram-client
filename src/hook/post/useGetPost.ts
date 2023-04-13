import { useQuery } from "react-query"
import { getAllPost } from "../../api/post/getAllPost"

export const useGetAllPost = () =>{
  return useQuery({
    queryKey: ["getAllPost"],
    queryFn:() => getAllPost(),
    retry:false,
  })
}