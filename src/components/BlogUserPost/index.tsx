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
import BoxPopUpComment from "./BoxPopUpComment";
import moment from "moment";
import { useAppSelector } from "../../app/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSubmit } from "../../hook/post/useSubmit";
import { useDeletePost } from "../../hook/post/useDeletePost";
import BoxSharePost from "./BoxSharePost";
import "./blog-user-post.scss";
import { useSavePostUser } from "../../hook/post/useSavePostUser";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MediaTypes from "../MediaTypes";
import { Link } from "react-router-dom";
import { Router } from "../../routers/route";

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
  saveBy,
  isHideLike,
  isShowLike,
}: BlogPost) {
  const [comment, setComment] = useState("");
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isShowConfig, setIsShowConfig] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [isSharePost, setIsSharePost] = useState(false);

  const { user: auth } = useAppSelector((state) => state.auth);
  const { onSubmitComment, onSubmitLikePost } = useSubmit();
  const deleteUserPost = useDeletePost();
  const savePostUser = useSavePostUser();

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
  const activeBookMark = saveBy?.some(
    (val: PostPartial) => val.id === auth?.id
  );

  return (
    <>
      <div className="box-container-post">
        <div className="top-header-post">
          <div>
            <Link
              to={
                auth?.id === userId
                  ? `${Router.PROFILE}/${username}`
                  : `${Router.ACCOUNT_USER}/${username}`
              }
            >
              <img src={user ?? DEFAULT_USER} alt="user-profile" />
              <span>{username}</span>
            </Link>
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
          <MediaTypes photo={photo} />
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
            <div
              onClick={() => {
                savePostUser.mutate(id);
              }}
            >
              {activeBookMark ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderOutlinedIcon />
              )}
            </div>
          </div>
          {!isHideLike && likes?.length! > 0 && (
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
            // <PostContext.Provider
            //   value={{
            //     id,
            //     description,
            //     likes,
            //     comments,
            //     photo,
            //     username,
            //     user,
            //   }}
            // >
            <BoxPopUpComment
              id={id}
              description={description}
              likes={likes}
              comments={comments}
              photo={photo}
              username={username}
              user={user}
              saveBy={saveBy}
              userId={userId}
              activeBookMark={activeBookMark}
              isShowConfig={() => {
                setIsShowConfig(true);
              }}
              isShowPopUp={() => {
                setIsShowPopUp(false);
              }}
              isHideLike={isHideLike}
              isShowLike={isShowLike}
            />
            // </PostContext.Provider>
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
