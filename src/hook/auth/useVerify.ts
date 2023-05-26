import { useMutation } from "react-query";
import { resendEmailVerification, verifiedEmail } from "../../api/auth/verify";
import { ValuesToken, VerifyValues } from "../../types/user";

export const useResendEmailVerification = () =>{
  return useMutation({
    mutationKey: ["resendEmail"],
    mutationFn:(values: VerifyValues) => resendEmailVerification(values),
    onSuccess:() =>{}
  })
}

export const useVerifiedEmail = (value: ValuesToken) =>{
  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn:() => verifiedEmail(value),
  })
}