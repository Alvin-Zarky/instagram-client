import React from "react";
import "./box-share-post.scss";
import HelmetTitleBar from "../../TitleBar";
import { USER_PROFILE } from "../../../constant/images";

export default function BoxSharePost() {
  return (
    <>
      <HelmetTitleBar title="Share - Instagram Clone" />
      <div className="box-share-post">
        <div className="box-header-post">
          <span>Share</span>
        </div>
        <div className="form-submission">
          <form>
            <input type="text" />
          </form>
        </div>
        <div className="user-friends">
          <span>Suggested</span>
          <div className="list-user-friends">
            <div className="user-flex-box">
              <div>
                <img src={USER_PROFILE} alt="user" />
                <span>Alvin</span>
              </div>
              <div>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
