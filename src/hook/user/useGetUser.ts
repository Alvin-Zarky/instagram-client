import { useQuery } from "react-query"
import { getAllUser } from "../../api/user/getUser"
import { ValuesToken } from "../../types/user"

export const useGetAllUser = (value?: string) =>{
  return useQuery({
    queryKey:["getAllUser"],
    queryFn:() => getAllUser(value),
    // refetchInterval:1000,
    // staleTime: 0,
    // cacheTime: 1000
    // retry:false
  })
}