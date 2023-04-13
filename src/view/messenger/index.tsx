import React from "react";
import SideMenuBar from "../../components/SideMenuBar";
import HelmetTitleBar from "../../components/TitleBar";
import "./messenger.scss";

export default function MessengerScreen() {
  return (
    <>
      <HelmetTitleBar title="Messenger - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">B</div>
        {/* <div className="right-content-side">C</div> */}
      </div>
    </>
  );
}
