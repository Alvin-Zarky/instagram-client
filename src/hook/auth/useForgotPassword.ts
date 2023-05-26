import { useMutation } from "react-query"
import { forgetPasswordAuth, resetPasswordAuth } from "../../api/auth/forgotPasswordUser"
import { ResetPasswordValues } from "../../types/authentication"

const useForgotPasswordUser = () =>{
  const useForgetPassword = () =>{
    return useMutation({
      mutationKey: ["forgetPassword"],
      mutationFn:(email: string) => forgetPasswordAuth(email),
      onSuccess:(data) =>{
      }
    })
  }

  const resetPassword = useMutation({
    mutationKey:["resetPassword"],
    mutationFn:(values: ResetPasswordValues) => resetPasswordAuth(values),
    onSuccess:(data) =>{
    }
  })

  return { useForgetPassword, resetPassword }
}

export default useForgotPasswordUser