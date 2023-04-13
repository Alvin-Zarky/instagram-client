import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Router } from "./route";
import DashboardScreen from "../view/dashboard";
import NotFoundScreen from "../view/not-found";
import SignInScreen from "../view/authentication/sign-in";
import SignUpScreen from "../view/authentication/sign-up";
import { useAppSelector } from "../app/hooks";
import ExploreScreen from "../view/explore";
import MessengerScreen from "../view/messenger";
import useAuthen from "../hook/auth/useAuth";
import NotificationScreen from "../view/notification";
import CreationScreen from "../view/create";
import ProfileScreen from "../view/profile";
import SettingScreen from "../view/setting";
import SavedScreen from "../view/saved";

export default function AppRoutes() {
  const {
    userProfileQuery: { data },
  } = useAuthen();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={Router.INDEX}>
            {!user && <Redirect to={Router.SIGN_IN} />}
            {user && <DashboardScreen profile={data} />}
          </Route>
          <Route path={Router.SIGN_IN}>
            {user && <Redirect to={Router.INDEX} />}
            {!user && <SignInScreen />}
          </Route>
          <Route path={Router.SIGN_UP}>
            {user && <Redirect to={Router.INDEX} />}
            {!user && <SignUpScreen />}
          </Route>
          <Route path={Router.EXPLORER}>
            {user && <ExploreScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.MESSAGE}>
            {user && <MessengerScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.NOTIFICATION}>
            {user && <NotificationScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.CREATE}>
            {user && <CreationScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.PROFILE}>
            {user && <ProfileScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.SETTINGS}>
            {user && <SettingScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.SAVED}>
            {user && <SavedScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
          <Route path={Router.ERROR_NOT_FOUND}>
            {user && <NotFoundScreen />}
            {!user && <Redirect to={Router.SIGN_IN} />}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
