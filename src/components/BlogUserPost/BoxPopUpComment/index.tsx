import React, { useRef, useState } from "react";
import "./box-pop-up.scss";
import { DEFAULT_USER } from "../../../constant/images";
import { BlogPost, PostPartial } from "../../../types/post";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useSubmit } from "../../../hook/post/useSubmit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../../app/hooks";
import { useSavePostUser } from "../../../hook/post/useSavePostUser";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BoxSharePost from "../BoxSharePost";
import MediaTypes from "../../MediaTypes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BoxConfigSetting from "../BoxConfigSetting";
import { useDeletePost } from "../../../hook/post/useDeletePost";

export default function BoxPopUpComment({
  username,
  user,
  photo,
  likes,
  comments,
  description,
  id,
  savePostUserId,
  saveBy,
  userId,
  isShowPopUp,
  isHideLike,
  isShowLike,
}: BlogPost) {
  const [comment, setComment] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [isShowConfig, setIsShowConfig] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { onSubmitComment, onSubmitLikePost } = useSubmit();
  // const postContext = usePostContext();
  // const { id, likes, photo, comments, description, username, user } =
  //   postContext ?? {};

  const savePostUser = useSavePostUser();
  const deleteUserPost = useDeletePost();

  const { user: auth } = useAppSelector((state) => state.auth);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (comment) {
      onSubmitComment(e, comment, id!);
      setComment("");
    }
    e.preventDefault();
  };

  const active = likes?.some((val: PostPartial) => val.id === auth?.id);

  const activeBookMark = saveBy?.some(
    (val: PostPartial) => val.id === auth?.id
  );
  return (
    <>
      <div className="box-comment-gallary">
        <div className="flex-row">
          <div className="left-side-image-slider">
            <div className="image-slider-cover">
              <MediaTypes photo={photo} />
            </div>
          </div>
          <div className="user-comment-discussion">
            <div className="contain-user-comment">
              <div className="top-header-bar">
                <div>
                  <img src={user ?? DEFAULT_USER} alt="user-profile" />
                  <span>{username}</span>
                </div>
                <div
                  onClick={() => {
                    setIsShowConfig(true);
                  }}
                >
                  <MoreHorizIcon />
                </div>
              </div>
              <div className="body-comment-bar">
                {description && (
                  <div className="user-header-bar">
                    <div>
                      <img src={user ?? DEFAULT_USER} alt="user-profile" />
                    </div>
                    <div>
                      <span>{username}</span>
                      <span className="description">{description}</span>
                    </div>
                  </div>
                )}
                <div
                  className="list-all-user-comment"
                  style={{ height: !description ? "530px" : "480px" }}
                >
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
                          onSubmitLikePost(id!, likes!);
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
                      <span
                        onClick={() => {
                          setIsShare(true);
                        }}
                      >
                        <ShareOutlinedIcon />
                      </span>
                    </div>
                    <div className="bookmark">
                      <span
                        onClick={() => {
                          savePostUser.mutate(id);
                          // document.body.style.overflowY = "visible";
                        }}
                      >
                        {activeBookMark || savePostUserId === auth?.id ? (
                          <BookmarkIcon />
                        ) : (
                          <BookmarkBorderOutlinedIcon />
                        )}
                      </span>
                    </div>
                  </div>
                  {!isHideLike && (
                    <div className="user-likes">
                      <span>
                        {likes?.length} like
                        {likes?.length! > 1 && "s"}
                      </span>
                    </div>
                  )}
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
      {isShare && (
        <>
          <div
            className="pop-up-modal"
            style={{ zIndex: 200 }}
            onClick={() => {
              setIsShare(false);
            }}
          ></div>
          <BoxSharePost />
        </>
      )}
      {isShowConfig && (
        <>
          <div
            className="pop-up-modal"
            style={{ zIndex: 200 }}
            onClick={() => {
              setIsShowConfig(false);
            }}
          ></div>
          <BoxConfigSetting
            onDeletePost={() => {
              deleteUserPost.mutate(id);
              setIsShowConfig(false);
              // isShowPopUp() ?? ;
            }}
            isYourPost={userId! === auth?.id}
            showPopUp={() => {
              setIsShowConfig(false);
            }}
          />
        </>
      )}
    </>
  );
}
