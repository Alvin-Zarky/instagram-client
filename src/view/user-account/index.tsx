import React from "react";
import "./user-account.scss";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import { NavLink, useParams } from "react-router-dom";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { Row } from "reactstrap";
import { Post } from "../../types/post";
import BoxUserProfilePost from "../../components/BoxUserProfilePost";
import { LOADING } from "../../constant/images";
import { Router } from "../../routers/route";
import ProfileAccountOverview from "../../components/ProfileAccountOverview";
import { UsernameParam } from "../../types/util";
import NotFoundScreen from "../not-found";
import { useGetUserAccount } from "../../hook/profile/useGetUserAccount";
import { useGetPostByAccount } from "../../hook/post/useGetSinglePost";

export default function UserAccountPage() {
  const { username } = useParams<UsernameParam>();

  const { data: user, isLoading: isGetting } = useGetUserAccount(username);
  const { data, isLoading } = useGetPostByAccount(username);

  return !user || isGetting ? (
    <NotFoundScreen />
  ) : (
    <>
      <HelmetTitleBar title={`${user.name} - Instagram Clone`} />
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

              {!data && !isLoading && (
                <div className="post-profile">
                  <div>
                    <div className="icon-post-profile">
                      <PhotoCameraOutlinedIcon />
                    </div>
                    <div className="title-post-profile">
                      <span>No Posts Yet</span>
                    </div>
                    <div className="detail-post-profile">
                      <span>
                        When they share posts, they will appear on your profile
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="img-loading">
                  <img src={LOADING} alt="" />
                </div>
              )}
              <div className="post-body-profile">
                <Row>
                  {data?.map((val: Post, ind: number) => (
                    <BoxUserProfilePost
                      key={ind}
                      id={val.id!}
                      userId={val.userId}
                      username={val.user!.name!}
                      createdAt={val.createdAt}
                      photo={val.media}
                      likes={val.likes}
                      comments={val.comments}
                      user={val.user!.photo!}
                      description={val.text}
                      saveBy={val.saveBy}
                      isHideLike={val.user?.isHideLike}
                    />
                  ))}
                </Row>
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
    </>
  );
}
