import React from "react";
import "./tagged.scss";
import HelmetTitleBar from "../../../components/TitleBar";
import SideMenuBar from "../../../components/SideMenuBar";
import { useAppSelector } from "../../../app/hooks";
import { NavLink, useParams } from "react-router-dom";
import { Router } from "../../../routers/route";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import { UsernameParam } from "../../../types/util";
import ProfileAccountOverview from "../../../components/ProfileAccountOverview";

export default function AccountTaggedProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const { username } = useParams<UsernameParam>();
  return (
    <>
      <HelmetTitleBar title={`${username} - Instagram Clone`} />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="profile-main-container">
            <ProfileAccountOverview />
            <div className="bottom-header-profile">
              <div className="menu-bar-profile">
                <ul>
                  <li>
                    <NavLink exact to={`${Router.ACCOUNT_USER}/${username}`}>
                      <GridOnOutlinedIcon />
                      <span>Posts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`${Router.ACCOUNT_USER}/${username}/tagged`}>
                      <PermContactCalendarOutlinedIcon />
                      <span>Tagged</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="post-profile">
                <div>
                  <div className="icon-post-profile">
                    <PermContactCalendarOutlinedIcon />
                  </div>
                  <div className="title-post-profile">
                    <span>Photos of you</span>
                  </div>
                  <div className="detail-post-profile">
                    <span>
                      When you tag you in photos, they will appear on your
                      profile
                    </span>
                  </div>
                  <div className="share-your-first-photo">
                    <span>tag your first photo</span>
                  </div>
                  <div className="post-footer">
                    <span>
                      <>@2023 Instagram Clone developed by Alvin</>
                    </span>
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
