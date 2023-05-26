import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../app/hooks";
import { DEFAULT_USER } from "../../constant/images";
import { RiSettings3Fill } from "react-icons/ri";
import AddIcon from "@mui/icons-material/Add";
import useAuthen from "../../hook/auth/useAuth";
import "./profile-overview.scss";
import { Link } from "react-router-dom";
import { Router } from "../../routers/route";

export default function ProfileOverview() {
  const [isShowPop, setIsShowPop] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const { logOutMutation } = useAuthen();
  useEffect(() => {
    document.body.style.overflowY = "unset";
    if (isShowPop) {
      document.body.style.overflowY = "hidden";
    }
  }, [isShowPop]);

  return (
    <>
      <div className="top-profile-header">
        <div className="contain-flex">
          <div className="image-profile">
            <img src={user?.photo ?? DEFAULT_USER} alt="profile" />
          </div>
          <div className="user-profile-detail">
            <div className="user-profile-flex">
              <div className="title-user-profile">
                <span>{user?.name}</span>
              </div>
              <Link to={Router.EDIT_PROFILE}>
                <div className="button-user-profile">
                  <span>Edit Profile</span>
                </div>
              </Link>
              <div
                className="icon-setting-user-profile"
                onClick={() => {
                  setIsShowPop(true);
                }}
              >
                <RiSettings3Fill />
              </div>
            </div>
            <div className="user-rating-profile">
              <div className="user-rating">
                <span className="bold-text">{user?.posts}</span>{" "}
                <span>post{user?.posts! > 1 && "s"}</span>
              </div>
              <div className="user-rating">
                <span className="bold-text">{user?.follower}</span>{" "}
                <span>follower{user?.follower! > 1 && "s"}</span>
              </div>
              <div className="user-rating">
                <span className="bold-text">{user?.following}</span>{" "}
                <span>following</span>
              </div>
            </div>
            <div className="email-user-profile">
              <span>{user?.email}</span>
            </div>
            <div className="user-description">
              <a target="_blank" href={user?.links} rel="noreferrer">
                <span>{user?.links}</span>
              </a>
              <p>{user?.bio}</p>
            </div>
          </div>
        </div>
        <div className="box-slider-story">
          <div className="box-list-collection">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={-20}
              slidesPerView={6}
              navigation
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <div className="box-collection">
                  <img src={DEFAULT_USER} alt="profile" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="box-collection">
                  <img src={DEFAULT_USER} alt="profile" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="box-collection">
                  <img src={DEFAULT_USER} alt="profile" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="box-collection">
                  <img src={DEFAULT_USER} alt="profile" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="box-collection">
                  <img src={DEFAULT_USER} alt="profile" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="new-box-collection">
                  <AddIcon />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      {isShowPop && (
        <>
          <div
            className="pop-up-modal"
            onClick={() => {
              setIsShowPop(false);
            }}
          ></div>
          <div className="box-setting-config">
            <div className="box-list">
              <ul>
                <li>Report</li>
                <li>Unfollow</li>
                <li>Add to favorites</li>
                <li>Go to post</li>
                <li>Copy link</li>
                <li>About this account</li>
                <li
                  className="text-bold"
                  onClick={() => {
                    logOutMutation.mutate();
                  }}
                >
                  Log Out
                </li>
                <li
                  className="text-bold"
                  onClick={() => {
                    setIsShowPop(false);
                  }}
                >
                  Cancel
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
