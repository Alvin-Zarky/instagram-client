import React, { FormEvent, useState } from "react";
import "./forget-password.scss";
import HelmetTitleBar from "../../../components/TitleBar";
import { Container } from "reactstrap";
import { LOGO_INSTAGRAM } from "../../../constant/images";
import FormBottomBar from "../../../components/FormBottomBar";
import useForgotPasswordUser from "../../../hook/auth/useForgotPassword";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { useForgetPassword } = useForgotPasswordUser();
  const forgotPassword = useForgetPassword();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setMessage("");
    setIsSuccess(false);
    e.preventDefault();

    forgotPassword.mutate(email, {
      onSuccess(data, variables, context) {
        setIsSuccess(true);
        setMessage("");
      },
      onError: (message) => {
        setIsSuccess(false);
        setMessage(message as string);
      },
    });
  };
  return (
    <>
      <HelmetTitleBar title={"Reset Password - Instagram Clone"} />
      <Container>
        <div className="main-container-auth-screen">
          <div className="main-contain-page">
            <div className="box-form-auth">
              <div className="logo-instagram padd-b0">
                <img src={LOGO_INSTAGRAM} alt="logo" />
              </div>
              <div className="form-description">
                <p>
                  Enter vour email phone or username and we send vou a link to
                  get back into your account.
                </p>
              </div>
              <div className="form-container">
                <form onSubmit={onSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="false"
                      required
                    />
                  </div>
                  <button className="btn-submit">
                    <span>
                      {forgotPassword.isLoading
                        ? "Sending..."
                        : "Send login link"}
                    </span>
                  </button>
                </form>
                {isSuccess && (
                  <div className="box-err-message box-success-message">
                    <span>We already sent link to reset your password</span>
                  </div>
                )}
                {message && (
                  <div className="box-err-message">
                    <span>{message}</span>
                  </div>
                )}
              </div>
            </div>
            <FormBottomBar isSignUp={false} />
          </div>
        </div>
      </Container>
    </>
  );
}
