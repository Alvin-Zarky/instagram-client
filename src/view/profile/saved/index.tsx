import React from "react";
import HelmetTitleBar from "../../../components/TitleBar";
import { useAppSelector } from "../../../app/hooks";
import SideMenuBar from "../../../components/SideMenuBar";
import { NavLink } from "react-router-dom";
import { Router } from "../../../routers/route";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import ProfileOverview from "../../../components/ProfileOverview";
import AddIcon from "@mui/icons-material/Add";
import { useGetUserSavePost } from "../../../hook/user/useGetUserSavePost";
import { Row } from "reactstrap";
import BoxUserProfilePost from "../../../components/BoxUserProfilePost";
import { SavePost } from "../../../types/save";
import { LOADING } from "../../../constant/images";
// import "../profile.scss";
import "./saved.scss";

export default function SavedProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserSavePost();

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
              {data?.length === 0 && !isLoading && (
                <div className="post-profile">
                  <div>
                    <div className="icon-post-profile">
                      <BookmarkBorderOutlinedIcon />
                    </div>
                    <div className="title-post-profile">
                      <span>Save Posts</span>
                    </div>
                    <div className="detail-post-profile">
                      <span>
                        When you save posts, they will appear on your profile
                      </span>
                    </div>
                    <div className="share-your-first-photo">
                      <span>Save your first photo</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="post-body-profile">
                {isLoading && (
                  <div className="img-loading">
                    <img src={LOADING} alt="loading" />
                  </div>
                )}
                {data?.length! > 0 && (
                  <>
                    <div className="post-top-profile">
                      <div>
                        <span>Only you can see what you've saved</span>
                      </div>
                      <div className="create-collection">
                        <span>
                          <AddIcon /> New Collection
                        </span>
                      </div>
                    </div>
                    <div className="box-collection">
                      <Row>
                        {data?.map((val: SavePost, ind: number) => (
                          <BoxUserProfilePost
                            key={ind}
                            id={val.postId!}
                            userId={val.userId}
                            username={val.user?.name!}
                            createdAt={val.createdAt}
                            photo={val.post?.media}
                            likes={val.post?.likes}
                            comments={val.post?.comments}
                            user={val.user!.photo!}
                            description={val.post?.text}
                            savePostUserId={val.savePostUserId}
                            isHideLike={val.user?.isHideLike}
                          />
                        ))}
                      </Row>
                    </div>
                  </>
                )}
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
