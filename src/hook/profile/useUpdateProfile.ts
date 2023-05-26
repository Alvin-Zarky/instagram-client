import { useMutation, useQueryClient } from "react-query"
import { UserEditPassword, UserEditProfile } from "../../types/user"
import { removeCurrentPhoto, updatePasswordProfile, updateProfile } from "../../api/profile/updateProfile"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { authSignInAsync } from "../../features/auth/authServices"

const useUpdateProfile = () =>{
  const queryClient= useQueryClient()
  const dispatch= useAppDispatch()
  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn:(value: UserEditProfile) => updateProfile(value),
    onSuccess:(data) =>{
      queryClient.refetchQueries(["userProfile"])
      dispatch(authSignInAsync(data))
    } 
  })
}

const useUpdatePassword = () =>{
  return useMutation({
    mutationKey: ["updatePassword"],
    mutationFn:(value: UserEditPassword) => updatePasswordProfile(value),
  })
}

const useRemoveCurrentPhoto = () =>{

  const {user} = useAppSelector((state) => state.auth)
  const queryClient= useQueryClient()
  const dispatch= useAppDispatch()

  const values={
    secure_url: "https://res.cloudinary.com/dt89p7jda/image/upload/v1675580588/Instagram%20Clone/user_vzvi5b.png",
    userPublicId: user?.photoDetail?.public_id
  }
  return useMutation({
    mutationKey: ["removePhoto"],
    mutationFn:() => removeCurrentPhoto(values),
    onSuccess:(data) =>{
      queryClient.refetchQueries(["userProfile"])
      dispatch(authSignInAsync(data))
    }
  })

}

export {
  useUpdateProfile,
  useUpdatePassword,
  useRemoveCurrentPhoto
}