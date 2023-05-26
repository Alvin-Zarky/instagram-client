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
import { useIsOnline } from "react-use-is-online";
import WebOffline from "../view/web-offline";
import SavedProfile from "../view/profile/saved";
import TaggedProfile from "../view/profile/tagged";
import EditProfile from "../view/edit-profile";
import AppAndWebsite from "../view/app-website";
import PersonalDetail from "../view/personal-detail";
import PasswordSecurity from "../view/password-security";
import WhatYouSee from "../view/what-you-see";
import WhoCanSeeYou from "../view/who-can-see";
import Help from "../view/help";
import ForgetPasswordScreen from "../view/authentication/forget-password";
import ResetPasswordScreen from "../view/authentication/reset-password";
import MessageChating from "../view/messenger/message-chating";
import UserAccountPage from "../view/user-account";
import AccountTaggedProfile from "../view/user-account/tagged";
import { User } from "../types/authentication";
import { useGetAllUser } from "../hook/user/useGetUser";
import PageVerifyAccount from "../view/authentication/verify-account";
import LoadingConfirmation from "../view/authentication/verify-account/loading-confirmation";

export default function AppRoutes() {
  const { user } = useAppSelector((state) => state.auth);
  const { isOnline } = useIsOnline();

  const { userProfileQuery } = useAuthen();
  const { data } = userProfileQuery;

  // const { data: allUser } = useGetAllUser();
  // console.log(allUser);

  return (
    <>
      {isOnline ? (
        <BrowserRouter>
          <Switch>
            <Route exact path={Router.INDEX}>
              {!user && <Redirect to={Router.SIGN_IN} />}
              {user && !user.isVerified && (
                <Redirect to={Router.VERIFICATION} />
              )}
              {user && user.isVerified && <DashboardScreen />}
            </Route>
            <Route path={Router.SIGN_IN}>
              {/* {user && <Redirect to={Router.INDEX} />}
              {!user && <SignInScreen />} */}
              {user && user.isVerified && <Redirect to={Router.INDEX} />}
              {user && !user?.isVerified && <SignInScreen />}
              {!user && <SignInScreen />}
            </Route>
            <Route path={Router.SIGN_UP}>
              {/* {user && <Redirect to={Router.INDEX} />} */}
              {/* {user && !user.isVerified && <SignUpScreen />} */}
              {user && user.isVerified && <Redirect to={Router.INDEX} />}
              {user && !user?.isVerified && <SignUpScreen />}
              {!user && <SignUpScreen />}
              {/* {user && <Redirect to={Router.VERIFICATION} />} */}
            </Route>
            <Route path={Router.FORGOT_PASSWORD}>
              {user && <Redirect to={Router.INDEX} />}
              {!user && <ForgetPasswordScreen />}
            </Route>
            <Route path={Router.EXPLORER}>
              {user && <ExploreScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route exact path={Router.MESSAGE}>
              {user && <MessengerScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={`${Router.MESSAGE}/:id`}>
              {user && <MessageChating />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={`${Router.NOTIFICATION}/:id`}>
              {user && <NotificationScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.CREATE}>
              {user && <CreationScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={`${Router.PROFILE}/${user?.name}`}>
              {user && <ProfileScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route exact path={`${Router.ACCOUNT_USER}/:username`}>
              {user && <UserAccountPage />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={`${Router.ACCOUNT_USER}/:username/tagged`}>
              {user && <AccountTaggedProfile />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.SETTINGS}>
              {user && <SettingScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.SAVED}>
              {user && <SavedProfile />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.TAGGED}>
              {user && <TaggedProfile />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.EDIT_PROFILE}>
              {user && <EditProfile />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.APP_AND_WEBSITE}>
              {user && <AppAndWebsite />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.PERSONAL_DETAIL}>
              {user && <PersonalDetail />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.PASSWORD_AND_SECURITY}>
              {user && <PasswordSecurity />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.WHAT_YOU_SEE}>
              {user && <WhatYouSee />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.WHO_CAN_SEE}>
              {user && <WhoCanSeeYou />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={Router.HELP}>
              {user && <Help />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
            <Route path={`${Router.RESET_PASSWORD}/:token`}>
              <ResetPasswordScreen />
            </Route>
            <Route path={Router.VERIFICATION}>
              {user && user.isVerified && <Redirect to={Router.INDEX} />}
              <PageVerifyAccount />
              {/* {user && <Redirect to={Router.VERIFICATION} />} */}
              {/* {!user && <Redirect to={Router.SIGN_UP} />} */}
              {/* {user && !user.isVerified && <PageVerifyAccount />} */}
            </Route>
            <Route path={`${Router.LOADING_CONFIRMATION}/:token`}>
              {/* {!user && <LoadingConfirmation />} */}
              <LoadingConfirmation />
              {user && user.isVerified && <Redirect to={Router.INDEX} />}
            </Route>
            <Route path={Router.ERROR_NOT_FOUND}>
              {user && <NotFoundScreen />}
              {!user && <Redirect to={Router.SIGN_IN} />}
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <WebOffline />
      )}
    </>
  );
}
