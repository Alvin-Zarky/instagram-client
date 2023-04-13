import React from "react";
import { Link } from "react-router-dom";
import { Router } from "../../routers/route";
import { APP_STORE, PLAY_STORE } from "../../constant/images";
import { PropAuthScreen } from "../../types/authentication";
import "./form-bottom-bar.scss";

export default function FormBottomBar({ isSignUp }: PropAuthScreen) {
  return (
    <>
      <div className="box-form-direct-page">
        {isSignUp && <span> Don't have an account yet?</span>}
        {!isSignUp && <span> Already have an account?</span>}
        {isSignUp ? (
          <Link to={Router.SIGN_UP}>Sign Up</Link>
        ) : (
          <Link to={Router.SIGN_IN}>Sign In</Link>
        )}
      </div>
      <div className="get-the-app">
        <span>Get App</span>
        <div className="image-public-store">
          <Link to={Router.SIGN_UP}>
            <img src={APP_STORE} alt="app-store" />
          </Link>
          <Link to={Router.SIGN_UP}>
            <img src={PLAY_STORE} alt="play-store" />
          </Link>
        </div>
      </div>
      <div className="content-bar-footer">
        <span>@2023 Instagram Clone developed by Alvin</span>
      </div>
    </>
  );
}
