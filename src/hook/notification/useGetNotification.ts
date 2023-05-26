import { useQuery } from "react-query"
import { getAllActivitiesNotification } from "../../api/notification/getAllNotification"

export const useGetAllNotification = () =>{
  return useQuery({
    queryKey:["getAllNotification"],
    queryFn:() => getAllActivitiesNotification(),
    // retry:false,
  })
}