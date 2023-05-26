import React, { useEffect } from "react";
import "./loading-confirmation.scss";
import { useHistory, useParams } from "react-router-dom";
import { ValuesToken } from "../../../../types/user";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { verifiedEmail } from "../../../../api/auth/verify";
import { authSignInAsync } from "../../../../features/auth/authServices";
import { Router } from "../../../../routers/route";
import { LOADING } from "../../../../constant/images";

export default function LoadingConfirmation() {
  const { user } = useAppSelector((state) => state.auth);
  const { token } = useParams<ValuesToken>();
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push(Router.INDEX);
    }
  }, [user, history]);

  useEffect(() => {
    const user = verifiedEmail({ token });
    dispatch(authSignInAsync(user as any));

    return () => {};
  }, [token, dispatch]);

  return (
    <>
      <div className="loading-component">
        <img src={LOADING} alt="loading" />
      </div>
    </>
  );
}
