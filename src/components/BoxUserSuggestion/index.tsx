import React from "react";
import { USER_PROFILE } from "../../constant/images";
import { BoxUserSuggest } from "../../types/dashboard";
import "./box-user-suggest.scss";

export default function BoxUserSuggestion({ username, user }: BoxUserSuggest) {
  return (
    <>
      <div className="top-profile-user box-suggestion">
        <div className="box-image-user box-image">
          <img src={USER_PROFILE} alt="my-user-profile" />
          <div className="box-title-user">
            <div className="top-title title-custom">
              <span>{username}</span>
            </div>
            <div className="bottom-title user-custom">
              <span>Followed by {user}</span>
            </div>
          </div>
        </div>
        <div className="btn-switch btn-follow">
          <span>Follow</span>
        </div>
      </div>
    </>
  );
}
