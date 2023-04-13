import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import "./explore.scss";

export default function ExploreScreen() {
  return (
    <>
      <HelmetTitleBar title="Explore - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <span>A</span>
          {/* <CallBackTesting /> */}
          {/* <MemoTesting /> */}
        </div>
      </div>
    </>
  );
}
