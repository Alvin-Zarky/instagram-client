import React from "react";
import "./tagged.scss";
import HelmetTitleBar from "../../../components/TitleBar";
import SideMenuBar from "../../../components/SideMenuBar";
import { useAppSelector } from "../../../app/hooks";
import { NavLink } from "react-router-dom";
import { Router } from "../../../routers/route";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import ProfileOverview from "../../../components/ProfileOverview";

export default function TaggedProfile() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <HelmetTitleBar title={`${user?.name} - Instagram Clone`} />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="profile-main-container">
            <ProfileOverview />
            <div className="bottom-header-profile">
              <div className="menu-bar-profile">
                <ul>
                  <li>
                    <NavLink to={`${Router.PROFILE}/${user?.name}`}>
                      <GridOnOutlinedIcon />
                      <span>Posts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={Router.SAVED}>
                      <BookmarkBorderOutlinedIcon />
                      <span>Saved</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={Router.TAGGED}>
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
