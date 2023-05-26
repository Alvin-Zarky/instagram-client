import React from "react";
import SideMenuBar from "../SideMenuBar";
import { META_LOGO } from "../../constant/images";
import { NavLink } from "react-router-dom";
import { Router } from "../../routers/route";
import { AppChildren } from "../../types/provider";
import "./page-all-profile.scss";

export default function PageAllProfile({ children }: AppChildren) {
  return (
    <>
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="profile-edit-container">
            <div className="main-width-edit">
              <span>Settings</span>
              <div className="box-edit-setting-profile">
                <div className="main-container">
                  <div className="flex-container">
                    <div className="left-edit-menu-side">
                      <div className="top-overview-edit-profile">
                        <div className="meta-logo">
                          <img src={META_LOGO} alt="meta" />
                        </div>
                        <div className="account-center">
                          <span>Account Center</span>
                        </div>
                        <div className="edit-profile-detail">
                          <p>
                            Manage your connected experiences and account
                            settings across Meta technologies.
                          </p>
                        </div>
                      </div>
                      <div className="list-menu-profile">
                        <ul>
                          <li>
                            <NavLink to={Router.EDIT_PROFILE}>
                              Edit Profile
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={Router.APP_AND_WEBSITE}>
                              App and websites
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={Router.PERSONAL_DETAIL}>
                              Personal details
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={Router.PASSWORD_AND_SECURITY}>
                              Password and security
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={Router.WHAT_YOU_SEE}>
                              What you see
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={Router.WHO_CAN_SEE}>
                              Who can see your content
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={Router.HELP}>Help</NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="right-box-side">
                      <div className="main-width-right-side">{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
