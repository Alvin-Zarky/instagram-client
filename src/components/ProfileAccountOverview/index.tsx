import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { DEFAULT_USER } from "../../constant/images";
import { RiSettings3Fill } from "react-icons/ri";
import AddIcon from "@mui/icons-material/Add";
import "../ProfileOverview/profile-overview.scss";
import { Link, useParams } from "react-router-dom";
import { Router } from "../../routers/route";
import { UsernameParam } from "../../types/util";
import { useGetUserAccount } from "../../hook/profile/useGetUserAccount";

export default function ProfileAccountOverview() {
  const [isShowPop, setIsShowPop] = useState(false);
  const { username } = useParams<UsernameParam>();

  const { data } = useGetUserAccount(username);

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
            <img src={data?.photo ?? DEFAULT_USER} alt="profile" />
          </div>
          <div className="user-profile-detail">
            <div className="user-profile-flex">
              <div className="title-user-profile">
                <span>{username}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                <div className="button-user-profile">
                  <span>Follow</span>
                </div>
                <Link to={`${Router.MESSAGE}/${data?.uid}`}>
                  <div className="button-user-profile">
                    <span>Message</span>
                  </div>
                </Link>
              </div>
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
                <span className="bold-text">{data?.posts}</span>{" "}
                <span>post{data?.posts! > 1 && "s"}</span>
              </div>
              <div className="user-rating">
                <span className="bold-text">{data?.follower}</span>{" "}
                <span>follower{data?.follower! > 1 && "s"}</span>
              </div>
              <div className="user-rating">
                <span className="bold-text">{data?.following}</span>{" "}
                <span>following</span>
              </div>
            </div>
            <div className="email-user-profile">
              <span>{data?.email}</span>
            </div>
            <div className="user-description">
              <a target="_blank" href={data?.links} rel="noreferrer">
                <span>{data?.links}</span>
              </a>
              <p>{data?.bio}</p>
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
                <li className="text-bold">Report</li>
                <li className="text-bold">Block</li>
                <li>About this account</li>
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
