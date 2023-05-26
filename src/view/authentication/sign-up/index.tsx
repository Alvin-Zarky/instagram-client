import React, { useState } from "react";
import FormBottomBar from "../../../components/FormBottomBar";
import { Container } from "reactstrap";
import { LOGO_INSTAGRAM } from "../../../constant/images";
import HelmetTitleBar from "../../../components/TitleBar";
import useAuthen from "../../../hook/auth/useAuth";
import "./sign-up.scss";
import { useHistory } from "react-router-dom";
import { Router } from "../../../routers/route";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { registerMutation } = useAuthen();
  const history = useHistory();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setMessage("Confirm password does not matched");
      return;
    }

    registerMutation.mutate(
      { name: username, user: email, password },
      {
        onSuccess: () => {
          setMessage("");
          history.push(Router.VERIFICATION);
        },
        onError: (error) => setMessage(error as string),
      }
    );
  };
  return (
    <>
      <HelmetTitleBar title={"Signup - Instagram Clone"} />
      <Container>
        <div className="main-container-auth-screen">
          <div className="main-contain-page">
            <div className="box-form-auth">
              <div className="logo-instagram padd-b0">
                <img src={LOGO_INSTAGRAM} alt="logo" />
              </div>
              <div className="form-description">
                <p>Sign up to see photos and videos from your friends.</p>
              </div>
              <div className="form-container">
                <form onSubmit={onSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Email"
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
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUserName(e.target.value);
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
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      autoComplete="false"
                      required
                    />
                  </div>
                  <button className="btn-submit">
                    <span>
                      {registerMutation.isLoading ? "Signing up..." : "Sign Up"}
                    </span>
                  </button>
                </form>
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
