import { useInfiniteQuery, useQuery } from "react-query"
import { getAllPost, getAllPostByUser, getAllPostOnScroll } from "../../api/post/getAllPost"
import { LastPage } from "../../types/util"

export const useGetAllPost = () =>{
  return useQuery({
    queryKey: ["getAllPost"],
    queryFn:() => getAllPost(),
  })
}

export const useGetPostInifiniteScroll = () =>{
  const limit =5
  return useInfiniteQuery({
    queryKey: ["getAllPost"],
    queryFn:({pageParam= 1}) => getAllPostOnScroll(pageParam, limit),
    getNextPageParam:(lastPage: LastPage) =>{
      return lastPage.pagination?.next?.page
    },
    // retry:false
  })
}

export const useGetAllPostUser = () =>{
  return useQuery({
    queryKey: ["getPostUser"],
    queryFn:() => getAllPostByUser(),
    retry:false
  })
}