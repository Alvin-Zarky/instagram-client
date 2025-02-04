import { useMutation, useQuery, useQueryClient } from "react-query"
import { AuthObjectValues, User } from "../../types/authentication"
import { getUserProfile, userLogIn, userLogOut, userRegister } from "../../api/auth/user"
import Storage from "../../utility/storage"
import { useAppDispatch } from "../../app/hooks"
import { authSignInAsync, authSignOutAsync } from "../../features/auth/authServices"

const useAuthen = () =>{

  const storage= new Storage("token")
  const token = storage.getItem()
  // const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null
  
  const dispatch= useAppDispatch()
  const queryClient= useQueryClient()

  const logInMutation = useMutation({
    mutationKey:["logIn"],
    mutationFn: (value: AuthObjectValues) => userLogIn(value),
    onSuccess:(data: User) =>{
      dispatch(authSignInAsync(data))
      storage.setItem(data.token!)
      // localStorage.setItem("user", JSON.stringify(data))
      // storage.setItem()
    } 
  })
  
  const registerMutation = useMutation({
    mutationKey:["register"],
    mutationFn:(values: AuthObjectValues) => userRegister(values),
    onSuccess:(data: User) =>{
      dispatch(authSignInAsync(data))
      queryClient.refetchQueries(["getAllUser"])
      // storage.setItem(data.token!)
    },
  })

  const logOutMutation = useMutation({
    mutationKey: ["logOut"],
    mutationFn:() => userLogOut(),
    onSuccess:(_data) =>{
      dispatch(authSignOutAsync())
      queryClient.removeQueries(["getPostUser"])
      queryClient.removeQueries(["getUserSavePost"])
      queryClient.removeQueries(["userProfile"])
      queryClient.removeQueries(["getMessage"])
      queryClient.removeQueries(["getAllNotification"])
      storage.removeItem()
    },
  })

  const userProfileQuery= useQuery({
    queryKey: ["userProfile"],
    enabled: token !== null,
    retry:false,
    queryFn: () => getUserProfile(),
    onSuccess:(data: User) =>{
      // queryClient.refetchQueries(["getAllUser"])
      // queryClient.refetchQueries(["userProfile"])
      dispatch(authSignInAsync(data))
    },
  })

  return { 
    logInMutation, 
    logOutMutation,
    registerMutation,
    userProfileQuery 
  }
}

export default useAuthen

