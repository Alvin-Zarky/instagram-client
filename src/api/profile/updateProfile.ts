import axios from "axios"
import { API_KEY, API_SECRET, API_USER, CLOUD_NAME } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import CryptoJS from "crypto-js"
import { UserEditPassword, UserEditProfile } from "../../types/user"

const updateProfile= async (value: UserEditProfile) =>{
  const response= await customAxios.put(`${API_USER}/profile`, {
    name: value.name,
    email: value.email,
    bio: value.bio,
    links: value.website,
    photo: value.photo
  })
  const { data } = response.data

  if(data) return data
}

const updatePasswordProfile = async (value: UserEditPassword) =>{
  const response= await customAxios.put(`${API_USER}/profile`, {
    currentPassword: value.currentPassword,
    password: value.password
  })
  const {data}= response.data

  if(data) return data
}

const removeCurrentPhoto = async (photo:any) =>{

  const response = await customAxios.put(`${API_USER}/profile`, {
    photo: photo.secure_url || photo,
    photoDetail:{
      public_id: photo.public_id || ""
    }
  }) 

  if(photo.userPublicId){
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = CryptoJS.SHA1(`public_id=${photo.userPublicId}&timestamp=${timestamp}${API_SECRET}`).toString();
    await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
        {
          public_id: photo.userPublicId,
          api_key: API_KEY,
          api_secret: API_SECRET,
          signature,
          timestamp
        }
      );
  }

  const { data } = response.data
  if(data) return data
}

export {
  updateProfile,
  updatePasswordProfile,
  removeCurrentPhoto
}