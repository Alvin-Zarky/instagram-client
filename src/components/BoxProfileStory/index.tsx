import React from "react";
import { BoxUserProfileStory } from "../../types/dashboard";

export default function BoxProfileStory({ image, title }: BoxUserProfileStory) {
  return (
    <>
      <div className="box-profile-story">
        <div className="box-image-story">
          <img src={image} alt="user-profile" />
        </div>
        <div className="title-profile">
          <span>{title}</span>
        </div>
      </div>
    </>
  );
}
