import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import { useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";
import { Router } from "../../routers/route";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ProfileOverview from "../../components/ProfileOverview";
import { useGetAllPostUser } from "../../hook/post/useGetPost";
import { Row } from "reactstrap";
import { Post } from "../../types/post";
import BoxUserProfilePost from "../../components/BoxUserProfilePost";
import { LOADING } from "../../constant/images";
import "./profile.scss";

export default function ProfileScreen() {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetAllPostUser();

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

              {!data && !isLoading && (
                <div className="post-profile">
                  <div>
                    <div className="icon-post-profile">
                      <PhotoCameraOutlinedIcon />
                    </div>
                    <div className="title-post-profile">
                      <span>Share Posts</span>
                    </div>
                    <div className="detail-post-profile">
                      <span>
                        When you share posts, they will appear on your profile
                      </span>
                    </div>
                    <div className="share-your-first-photo">
                      <span>Share your first photo</span>
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
                      isHideLike={false}
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
