import React from "react";
import { LOGO_OFFLINE } from "../../constant/images";
import { useIsOnline } from "react-use-is-online";
import "./web-offline.scss";

export default function WebOffline() {
  const { isOnline } = useIsOnline();
  return (
    <>
      <div className={`${!isOnline && "web-page-offline"}`}>
        <div className="image-logo">
          <img src={LOGO_OFFLINE} alt="logoInstagram" />
        </div>
        <div className="title-description">
          <span>You're offline</span>
        </div>
      </div>
    </>
  );
}
