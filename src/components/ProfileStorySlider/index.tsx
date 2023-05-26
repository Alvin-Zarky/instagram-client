import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllUser } from "../../hook/user/useGetUser";
import { User } from "../../types/authentication";
import { Link } from "react-router-dom";
import { Router } from "../../routers/route";
import BoxProfileStory from "../BoxProfileStory";
import { LOADING } from "../../constant/images";
import "./profile-story.scss";

export default function ProfileStorySlider() {
  const { data, isLoading } = useGetAllUser();

  if (isLoading) {
    return (
      <div className="loading-widget">
        <img src={LOADING} alt="" />
      </div>
    );
  }
  return (
    <>
      <div className="profile-story-slider">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={-30}
          slidesPerView={7}
          navigation
          pagination={{ clickable: true }}
        >
          {data?.map((val: User, ind: number) => (
            <SwiperSlide key={ind}>
              <Link to={`${Router.ACCOUNT_USER}/${val.name}`}>
                <BoxProfileStory
                  key={ind}
                  title={val.name!}
                  image={val.photo!}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
