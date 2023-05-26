import React, { useState } from "react";
import "./reset-password.scss";
import HelmetTitleBar from "../../../components/TitleBar";
import { Container } from "reactstrap";
import { LOGO_INSTAGRAM } from "../../../constant/images";
import useForgotPasswordUser from "../../../hook/auth/useForgotPassword";
import { Link, useParams } from "react-router-dom";
import { TokenParam } from "../../../types/authentication";
import { Router } from "../../../routers/route";
import { useAppSelector } from "../../../app/hooks";
import NavBarPageVerify from "../../../components/NavbarPageVerify";

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [cfNewPassword, setCfNewPassword] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { resetPassword } = useForgotPasswordUser();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: resetPasswordFunc,
  } = resetPassword;
  const { token } = useParams<TokenParam>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetPasswordFunc({
      token,
      newPassword,
      confirmNewPassword: cfNewPassword,
    });
  };

  return (
    <>
      <HelmetTitleBar title={"Reset Password - Instagram Clone"} />
      <NavBarPageVerify />
      <Container>
        <div className="main-container-auth-screen">
          <div className="main-contain-page">
            <div className="box-form-auth">
              <div className="title-reset-password">
                <span>Create A Strong Password</span>
              </div>
              <div className="form-description">
                <p>
                  Your password must be at least 6 characters and should include
                  a combination of numbers, letters and special characters
                  (!$@%).
                </p>
              </div>
              <br />
              <div className="form-container">
                <form onSubmit={onSubmit}>
                  <div>
                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      autoComplete="false"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="New password, again"
                      value={cfNewPassword}
                      onChange={(e) => {
                        setCfNewPassword(e.target.value);
                      }}
                      autoComplete="false"
                      required
                    />
                  </div>
                  <button className="btn-submit">
                    <span>
                      {isLoading ? "Reseting password..." : "Reset Password"}
                    </span>
                  </button>
                </form>
                {isSuccess && (
                  <div className="box-err-message box-success-message">
                    <span>You successfully reset your password!</span>
                  </div>
                )}
                {isError && (
                  <div className="box-err-message">
                    <span>{String(error)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
