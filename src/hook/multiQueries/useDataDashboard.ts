import { useQueries } from "react-query"
import { getAllUser } from "../../api/user/getUser"
import { getAllPost } from "../../api/post/getAllPost"

const useDataDashboard = () =>{
  return useQueries([
    {
      queryKey: ["users"],
      queryFn:() => getAllUser()
    },
    {
      queryKey:["posts"],
      queryFn:() => getAllPost()
    }
  ])
}

export {
  useDataDashboard
}