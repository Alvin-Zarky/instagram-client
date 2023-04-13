import { useQuery } from "react-query"
import { getAllUser } from "../../api/user/getUser"

export const useGetAllUser = () =>{
  return useQuery({
    queryKey:["getAllUser"],
    queryFn:() => getAllUser(),
  })
}