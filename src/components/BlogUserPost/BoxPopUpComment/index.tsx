import React, { useRef, useState } from "react";
import { DEFAULT_USER } from "../../../constant/images";
import { BlogPost, PostPartial } from "../../../types/post";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSubmit } from "../../../hook/post/useSubmit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../../app/hooks";
import "./box-pop-up.scss";

export default function BoxPopUpComment({
  username,
  user,
  photo,
  likes,
  comments,
  description,
  id,
}: BlogPost) {
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { onSubmitComment, onSubmitLikePost } = useSubmit();

  const { user: auth } = useAppSelector((state) => state.auth);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (comment) {
      onSubmitComment(e, comment, id);
      setComment("");
    }
    e.preventDefault();
  };

  const active = likes?.some((val: PostPartial) => val.id === auth?.id);

  return (
    <div className="box-comment-gallary">
      <div className="flex-row">
        <div className="left-side-image-slider">
          <div className="image-slider-cover">
            {photo?.length! > 1 ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {photo?.map((val: string, ind: number) => (
                  <SwiperSlide key={ind}>
                    <img src={val} alt="gallary" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src={photo![0]} alt="imageSlider" />
            )}
          </div>
        </div>
        <div className="user-comment-discussion">
          <div className="contain-user-comment">
            <div className="top-header-bar">
              <div>
                <img src={user ?? DEFAULT_USER} alt="user-profile" />
                <span>{username}</span>
              </div>
            </div>
            <div className="body-comment-bar">
              <div className="user-header-bar">
                <div>
                  <img src={user ?? DEFAULT_USER} alt="user-profile" />
                </div>
                <div>
                  <span>{username}</span>
                  <span className="description">{description}</span>
                </div>
              </div>
              <div className="list-all-user-comment">
                {comments?.map((val: PostPartial, ind: number) => (
                  <div className="user-comment" key={ind}>
                    <div>
                      <img src={val.photo ?? DEFAULT_USER} alt={val.name} />
                    </div>
                    <div>
                      <span>{val.name}</span>
                      <span className="naming-comment">{val.comment}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="user-comment-footer">
                <div className="list-icon-reaction">
                  <div className="icon-reactions">
                    <span
                      onClick={() => {
                        onSubmitLikePost(id, likes!);
                      }}
                    >
                      {active ? (
                        <FavoriteIcon className="icon-active" />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}
                    </span>
                    <span
                      onClick={() => {
                        inputRef.current?.focus();
                      }}
                    >
                      <ChatBubbleOutlineOutlinedIcon />
                    </span>
                    <span onClick={() => {}}>
                      <ShareOutlinedIcon />
                    </span>
                  </div>
                  <div>
                    <BookmarkBorderOutlinedIcon />
                  </div>
                </div>
                <div className="user-likes">
                  <span>
                    {likes?.length} like{likes?.length! > 1 && "s"}
                  </span>
                </div>
              </div>
            </div>
            <div className="form-add-comment">
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={comment}
                  ref={inputRef}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                {comment && <button>Post</button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
