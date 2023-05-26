import { API_NOTIFICATION } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { NotificationData } from "../../types/notification"

const getAllActivitiesNotification = async ():Promise<NotificationData[] | undefined> =>{
  const response= await customAxios.get(`${API_NOTIFICATION}/allActivities`)
  const {data} = response.data

  if(data) return data
}

export{
  getAllActivitiesNotification
}