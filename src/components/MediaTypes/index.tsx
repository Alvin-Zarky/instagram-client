import React from "react";
import { PhotoBlogPost } from "../../types/util";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const MediaTypes = ({ photo }: PhotoBlogPost) => {
  const isImage = photo && photo[0].split("/").includes("image");

  return photo!.length === 1 ? (
    isImage ? (
      <img src={photo![0]} alt="singleGallary" />
    ) : (
      <video controls>
        <source src={photo![0]} type="video/mp4" />
      </video>
    )
  ) : (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {photo?.map((val: string, ind: number) => (
        <SwiperSlide key={ind}>
          {val.split("/").includes("image") ? (
            <img src={val} alt="gallary" />
          ) : (
            <video src={val} controls />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MediaTypes;
