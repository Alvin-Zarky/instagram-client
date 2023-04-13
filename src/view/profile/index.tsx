import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import "./profile.scss";

export default function ProfileScreen() {
  return (
    <>
      <HelmetTitleBar title="Profile - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">B</div>
        {/* <div className="right-content-side">C</div> */}
      </div>
    </>
  );
}
