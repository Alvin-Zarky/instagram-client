import React from "react";
import { BoxPostSetting } from "../../../types/dashboard";
import "./box-config-setting.scss";

export default function BoxConfigSetting({
  showPopUp,
  isYourPost,
  onDeletePost,
}: BoxPostSetting) {
  return (
    <div className="box-setting-config">
      <div className="box-list">
        <ul>
          <li>Report</li>
          <li>Unfollow</li>
          <li>Add to favorites</li>
          <li>Go to post</li>
          <li>Copy link</li>
          <li>About this account</li>
          {isYourPost && (
            <li
              className="text-bold"
              onClick={() => {
                onDeletePost();
              }}
            >
              Delete the post
            </li>
          )}
          <li className="text-bold" onClick={showPopUp}>
            Cancel
          </li>
        </ul>
      </div>
    </div>
  );
}
