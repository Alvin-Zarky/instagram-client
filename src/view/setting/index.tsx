import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import "./setting.scss";

export default function SettingScreen() {
  return (
    <>
      <HelmetTitleBar title="Setting - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">B</div>
        {/* <div className="right-content-side">C</div> */}
      </div>
    </>
  );
}
