import { useQuery } from "react-query"
import { getAccountUserByName } from "../../api/profile/getAccountUser"

const useGetUserAccount = (username: string) =>{
  return useQuery({
    queryKey:["getUserAccount"],
    queryFn:() => getAccountUserByName(username),
    // retry:false,
  })
}

export {
  useGetUserAccount
}