import React, { FormEvent, useState } from "react";
import PageAllProfile from "../../components/PageAllProfile";
import { Row, Col } from "reactstrap";
import "../edit-profile/edit-profile.scss";
import "./password-security.scss";
import { useUpdatePassword } from "../../hook/profile/useUpdateProfile";
import HelmetTitleBar from "../../components/TitleBar";
import useForgotPasswordUser from "../../hook/auth/useForgotPassword";
import { useAppSelector } from "../../app/hooks";

export default function PasswordSecurity() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfNewPassword, setCfNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | undefined | null>();

  const { user } = useAppSelector((state) => state.auth);
  const updatePassword = useUpdatePassword();
  const { useForgetPassword } = useForgotPasswordUser();
  const { isSuccess: isSent, mutate: forgetPasswordFunc } = useForgetPassword();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (cfNewPassword !== newPassword) {
      setMessage("Re-type new password was incorrect!");
      setIsSuccess(false);
      return;
    }
    updatePassword.mutate(
      { currentPassword, password: newPassword },
      {
        onError: (message) => {
          setMessage(message as string);
          setIsSuccess(false);
        },
        onSuccess: () => {
          setMessage("");
          setIsSuccess(true);
        },
      }
    );
  };

  return (
    <>
      <HelmetTitleBar title="Password And Security - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>Password And Security</span>
        </div>
        <div className="body-overview">
          <form onSubmit={onSubmit}>
            <div className="box-section-part">
              <Row className="flex-section">
                <Col xl="3" lg="3">
                  <div className="left-flex-section">
                    <span>Current password</span>
                  </div>
                </Col>
                <Col xl="9" lg="9">
                  <div className="right-flex-section">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current password"
                      required
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="box-section-part">
              <Row className="flex-section">
                <Col xl="3" lg="3">
                  <div className="left-flex-section">
                    <span>New password</span>
                  </div>
                </Col>
                <Col xl="9" lg="9">
                  <div className="right-flex-section">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      required
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="box-section-part">
              <Row className="flex-section">
                <Col xl="3" lg="3">
                  <div className="left-flex-section">
                    <span>Re-type new password</span>
                  </div>
                </Col>
                <Col xl="9" lg="9">
                  <div className="right-flex-section">
                    <input
                      type="password"
                      value={cfNewPassword}
                      onChange={(e) => setCfNewPassword(e.target.value)}
                      placeholder="Re-type new password"
                      required
                    />
                    <div
                      className="forget-password"
                      onClick={() => {
                        forgetPasswordFunc(user?.email!);
                      }}
                    >
                      <span>Forgot your password?</span>
                    </div>

                    {isSent && (
                      <div className="message-reset-password">
                        <span>
                          We've already sent you a link reset password to your
                          email.
                        </span>
                      </div>
                    )}
                    {message && (
                      <div className="message-error">
                        <span>{message}</span>
                      </div>
                    )}
                    {isSuccess && (
                      <div className="message-success">
                        <span>Password has been updated successfully</span>
                      </div>
                    )}
                  </div>
                  <button className="btn-submit">
                    <span>
                      {updatePassword.isLoading ? "Submiting..." : "Submit"}
                    </span>
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </PageAllProfile>
    </>
  );
}
