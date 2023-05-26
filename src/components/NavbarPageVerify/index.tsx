import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { Router } from "../../routers/route";
import { LOGO_INSTAGRAM } from "../../constant/images";
import "./navbar-page-verify.scss";

export default function NavBarPageVerify() {
  return (
    <>
      <Container fluid className="pad-l0-r0">
        <div className="header-navbar-instagram">
          <Container>
            <div className="header-container">
              <div>
                <Link to={Router.INDEX}>
                  <div className="logo-img">
                    <img src={LOGO_INSTAGRAM} alt="logo" />
                  </div>
                </Link>
              </div>
              <div className="btn-flex">
                <Link to={Router.SIGN_IN}>
                  <div className="btn-log-in">
                    <span>Log In</span>
                  </div>
                </Link>
                <Link to={Router.SIGN_UP}>
                  <div className="btn-sign-up">
                    <span>Sign Up</span>
                  </div>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
}
