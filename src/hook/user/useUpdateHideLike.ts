import { useMutation, useQueryClient } from "react-query"
import { setHideLikeUser } from "../../api/user/setHideLikeUser"
import { useAppDispatch } from "../../app/hooks"
import { updateHideLike } from "../../features/auth/authServices"
import { User } from "../../types/authentication"

const useUpdateSettingLike = () =>{
  const queryClient= useQueryClient()
  const dispatch= useAppDispatch()
  return useMutation({
    mutationKey:["updateSettingLike"],
    mutationFn:(like: boolean) => setHideLikeUser(like),
    onSuccess:(data: User | undefined) =>{
      queryClient.refetchQueries(["userProfile"])
      dispatch(updateHideLike(data!))
    }
  })
}

export {
  useUpdateSettingLike
}