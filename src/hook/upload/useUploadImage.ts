import { useMutation, useQueryClient } from "react-query"
import { uploadImage } from "../../api/upload/uploadCloudinary"
import { removeCurrentPhoto } from "../../api/profile/updateProfile"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { updateProfilePhoto } from "../../features/auth/authServices"

const useUploadImage = () =>{

  const {user} = useAppSelector((state) => state.auth)
  const queryClient= useQueryClient()
  const dispatch= useAppDispatch()

  const uploadSingleImage = useMutation({
    mutationKey: ["uploadSingleImage"],
    mutationFn:(formData: FormData) => uploadImage(formData),
    onSuccess:(data) =>{

      const values={
        ...data,
        userPublicId: user?.photoDetail?.public_id
      }
      dispatch(updateProfilePhoto(data?.secure_url!))
      removeCurrentPhoto(values)
      queryClient.refetchQueries(["userProfile"])
    }
  })

  const uploadMultiFile = useMutation({
    mutationKey:["uploadMultiFile"],
    mutationFn:(formData: FormData) => uploadImage(formData)
  })

  return { uploadSingleImage, uploadMultiFile }
}

export default useUploadImage