import { API_KEY, API_SECRET, CLOUD_NAME } from "../../config/env";
import { UserMessage } from "../../types/message"
import axios from "axios"
import CryptoJS from "crypto-js"

const deleteSingleImageCloudinary = async (values: UserMessage) =>{
  if(values.text.public_id){
    const timestamps = Math.floor(Date.now() / 1000)
    const signature = CryptoJS.SHA1(`public_id=${values.text.public_id}&timestamp=${timestamps}${API_SECRET}`).toString();

    return await axios.post(
          values.text.type === "image" ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy` : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/destroy`,
          {
            public_id: values.text.public_id,
            api_key: API_KEY,
            api_secret: API_SECRET,
            signature,
            timestamp: timestamps,
          }
        );
  }
}

const deleteMultiImageCloudinary = async (values: UserMessage[]) =>{
  const timestamps = Math.floor(Date.now() / 1000)

  for(let i= 0; i< values.length; i++){
    if(values[i].text.public_id){
      const signature = CryptoJS.SHA1(`public_id=${values[i].text.public_id}&timestamp=${timestamps}${API_SECRET}`).toString();

      await axios.post(
            values[i].text.type === "image" ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy` : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/destroy`,
            {
              public_id: values[i].text.public_id,
              api_key: API_KEY,
              api_secret: API_SECRET,
              signature,
              timestamp: timestamps,
            }
          );
    }
  }  
}

export {
  deleteSingleImageCloudinary,
  deleteMultiImageCloudinary
}