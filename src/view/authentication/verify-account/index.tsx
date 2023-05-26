import React, { useEffect } from "react";
import "./verify-account.scss";
import HelmetTitleBar from "../../../components/TitleBar";
import NavBarPageVerify from "../../../components/NavbarPageVerify";
import { Container, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Router } from "../../../routers/route";
import { MAIL_VERIFY } from "../../../constant/images";
import { useAppSelector } from "../../../app/hooks";
import { useResendEmailVerification } from "../../../hook/auth/useVerify";

export default function PageVerifyAccount() {
  const { user } = useAppSelector((state) => state.auth);
  const resendEmail = useResendEmailVerification();
  const history = useHistory();

  useEffect(() => {
    if (user?.isVerified) {
      history.push(Router.INDEX);
    }
  }, [user, history]);
  return (
    <>
      <HelmetTitleBar title={"Verify Email - Instagram Clone"} />
      <NavBarPageVerify />
      <Container>
        <div className="class-page-verify">
          <Row style={{ alignItems: "center" }}>
            <Col xl="8" lg="8" md="8">
              <div className="verify-content-description">
                <div className="title-page">
                  <span>Check your email</span>
                </div>
                <div className="detail">
                  <p>We sent a verification link to:</p>
                </div>
                <div className="user-email">
                  <span>{user?.email}</span>
                </div>
                <div className="description-go-ahead">
                  <p>
                    Check your email and click the verification link to continue
                    creating your account
                  </p>
                </div>
                <div
                  className="resend-verification-email"
                  onClick={() => {
                    resendEmail.mutate({ id: user?.id, email: user?.email });
                  }}
                >
                  <span>Resend verification email</span>
                </div>
                <div className="back-to-auth">
                  <span>
                    Wrong email address?{" "}
                    <span className="link-back-on">
                      <Link to={Router.SIGN_UP}>Back to signup</Link>
                    </span>
                  </span>
                </div>

                {resendEmail.isError && (
                  <div className="box-alert-message">
                    <span>{resendEmail.error as string}</span>
                  </div>
                )}
              </div>
            </Col>
            <Col xl="4" lg="4" md="4">
              <div className="mail-inbox">
                <img src={MAIL_VERIFY} alt="" />
              </div>
            </Col>
          </Row>
          <div className="footer-bottom-page">
            <span>@2023 Instagram Clone developed by Alvin</span>
          </div>
        </div>
      </Container>
    </>
  );
}
