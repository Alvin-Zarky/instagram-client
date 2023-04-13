import { useQuery } from "react-query"
import { getSinglePost } from "../../api/post/getSinglePost"

const useGetSinglePost = (id:number) =>{
  return useQuery({
    enabled: id !== null,
    retry:false,
    queryKey:["getSinglePost", id],
    queryFn:() => getSinglePost(id),
  })
}

export {
  useGetSinglePost
}