import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import { BlogPost } from "../../types/post";
import BoxPopUpComment from "../BlogUserPost/BoxPopUpComment";
import "./box-user-profile.scss";

export default function BoxUserProfilePost({
  id,
  description,
  user,
  username,
  likes,
  comments,
  photo,
  savePostUserId,
  saveBy,
  userId,
  isHideLike,
}: BlogPost) {
  const [isShowPop, setIsShowPop] = useState(false);

  useEffect(() => {
    if (isShowPop) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [isShowPop]);
  const isImage = photo && photo[0].split("/").includes("image");

  return (
    <>
      <Col xl="4" lg="4" md="4" sm="6" xs="12">
        <div
          className="box-post-user"
          onClick={() => {
            setIsShowPop(true);
          }}
        >
          {isImage ? (
            <img src={photo![0]} alt="post" />
          ) : (
            <video src={photo![0]} />
          )}
          <div className="pop-up-hover">
            <div className="box-pop-hover">
              {!isHideLike && (
                <div>
                  <FavoriteOutlinedIcon />
                  <span>{likes?.length}</span>
                </div>
              )}
              <div>
                <ChatBubbleOutlinedIcon />
                <span>{comments?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </Col>
      {isShowPop && (
        <>
          <div
            className="pop-up-modal"
            onClick={() => {
              setIsShowPop(false);
            }}
          ></div>
          <div>
            <BoxPopUpComment
              id={id}
              likes={likes}
              comments={comments}
              username={username}
              user={user}
              description={description}
              photo={photo}
              savePostUserId={savePostUserId}
              saveBy={saveBy}
              userId={userId}
              isHideLike={isHideLike}
            />
          </div>
        </>
      )}
    </>
  );
}
