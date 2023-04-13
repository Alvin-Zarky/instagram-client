import React, { useEffect, useState } from "react";
import ReadMoreReact from "read-more-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DEFAULT_USER } from "../../constant/images";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { BlogPost, PostPartial } from "../../types/post";
import BoxConfigSetting from "./BoxConfigSetting";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BoxPopUpComment from "./BoxPopUpComment";
import moment from "moment";
import { useAppSelector } from "../../app/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSubmit } from "../../hook/post/useSubmit";
import { useDeletePost } from "../../hook/post/useDeletePost";
import "./blog-user-post.scss";
import BoxSharePost from "./BoxSharePost";

export default function BlogUserPost({
  username,
  createdAt,
  photo,
  user,
  likes,
  comments,
  description,
  userId,
  id,
}: BlogPost) {
  const [comment, setComment] = useState("");
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isShowConfig, setIsShowConfig] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [isSharePost, setIsSharePost] = useState(false);

  const { user: auth } = useAppSelector((state) => state.auth);
  const { onSubmitComment, onSubmitLikePost } = useSubmit();
  const deleteUserPost = useDeletePost();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (comment !== "") {
      onSubmitComment(e, comment, id);
      setComment("");
    }

    e.preventDefault();
  };

  useEffect(() => {
    document.body.style.overflowY = "unset";
    if (isShowPopUp || isShowComment) {
      document.body.style.overflowY = "hidden";
    }
  }, [isShowPopUp, isShowComment]);

  const active = likes?.some((val: PostPartial) => val.id === auth?.id);

  return (
    <>
      <div className="box-container-post">
        <div className="top-header-post">
          <div>
            <img src={user ?? DEFAULT_USER} alt="user-profile" />
            <span>{username}</span>
            <span className="hour-ago"> . {moment(createdAt).fromNow()}</span>
          </div>
          <div
            onClick={() => {
              setIsShowPopUp(!isShowPopUp);
              setIsShowConfig(true);
            }}
          >
            <MoreHorizIcon />
          </div>
        </div>
        <div className="box-image-slider-post">
          {photo?.length === 1 ? (
            <img src={photo[0]} alt="singleGallary" />
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
                  <img src={val} alt="gallary" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="footer-container-post">
          <div className="icon-reaction">
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
                  setIsShowPopUp(true);
                  setIsShowComment(true);
                }}
              >
                <ChatBubbleOutlineOutlinedIcon />
              </span>
              <span
                onClick={() => {
                  setIsShowPopUp(true);
                  setIsSharePost(true);
                }}
              >
                <ShareOutlinedIcon />
              </span>
            </div>
            <div>
              <BookmarkBorderOutlinedIcon />
            </div>
          </div>
          {likes?.length! > 0 && (
            <div className="user-like-post">
              <span>
                {likes?.length} like{likes?.length! > 1 && "s"}
              </span>
            </div>
          )}
          <div className="description">
            <>
              <p>{username}</p>
              <p>{description}</p>
              {/* <ReadMoreReact
                text={description}
                min={5}
                ideal={20}
                max={description!.length}
                readMoreText="... more"
              /> */}
            </>
          </div>
          {comments?.length! > 0 && (
            <div className="view-all-comments">
              <span
                onClick={() => {
                  setIsShowPopUp(true);
                  setIsShowComment(true);
                }}
              >
                View all {comments?.length} comment
                {comments?.length! > 1 && "s"}
              </span>
            </div>
          )}
          <div className="form-submit-comment">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Add a comment..."
              />
              {comment && <button>Post</button>}
            </form>
          </div>
        </div>
      </div>
      {isShowPopUp && (
        <>
          <div
            className="pop-up-modal"
            onClick={() => {
              setIsShowPopUp(false);
              setIsShowComment(false);
              setIsSharePost(false);
              setIsShowConfig(false);
            }}
          ></div>
          {isSharePost && <BoxSharePost />}
          {isShowComment && (
            <BoxPopUpComment
              id={id}
              description={description}
              likes={likes}
              comments={comments}
              photo={photo}
              username={username}
              user={user}
            />
          )}
          {isShowConfig && (
            <BoxConfigSetting
              onDeletePost={() => {
                deleteUserPost.mutate(id);
                setIsShowComment(false);
                setIsShowPopUp(false);
              }}
              isYourPost={userId! === auth?.id}
              showPopUp={() => {
                setIsShowPopUp(false);
                setIsShowComment(false);
                setIsShowConfig(false);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
