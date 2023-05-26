import axios from "axios"
import { API_CLOUDINARY, CLOUD_NAME } from "../../config/env"
import { DataCloudinary } from "../../types/util"

const uploadImage = async (formData: FormData): Promise<DataCloudinary | undefined> =>{
  try{
    const response = await axios.post(`${API_CLOUDINARY}/${CLOUD_NAME}/upload`, formData)
    const {data} = response

    if(data) return data
  }catch(err: any){
    return undefined
  }
}

export {
  uploadImage
}