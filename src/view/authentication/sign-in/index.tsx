import React, { useState } from "react";
import { Container } from "reactstrap";
import { LOGO_INSTAGRAM } from "../../../constant/images";
import FormBottomBar from "../../../components/FormBottomBar";
import HelmetTitleBar from "../../../components/TitleBar";
import useAuthen from "../../../hook/auth/useAuth";
import "./sign-in.scss";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { logInMutation } = useAuthen();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    logInMutation.mutate(
      { user: email, password },
      {
        onSuccess: () => {},
        onError: (error) => {
          setMessage(error as string);
        },
      }
    );
  };

  return (
    <>
      <HelmetTitleBar title={"Login - Instagram Clone"} />
      <Container>
        <div className="main-container-auth-screen">
          <div className="main-contain-page">
            <div className="box-form-auth">
              <div className="logo-instagram">
                <img src={LOGO_INSTAGRAM} alt="logo" />
              </div>
              <div className="form-container">
                <form onSubmit={onSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone number, username, or email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="false"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                      autoComplete="false"
                      required
                    />
                  </div>
                  <div className="form-agreement">
                    <span>
                      You agree to our Terms , Privacy Policy and Cookies Policy
                      .
                    </span>
                  </div>
                  <button className="btn-submit">
                    <span>
                      {logInMutation.isLoading ? "Loggin in..." : "Log In"}
                    </span>
                  </button>
                </form>
                {logInMutation.isError && (
                  <div className="box-err-message">
                    <span>{message}</span>
                  </div>
                )}
              </div>
            </div>
            <FormBottomBar isSignUp={true} />
          </div>
        </div>
      </Container>
    </>
  );
}
