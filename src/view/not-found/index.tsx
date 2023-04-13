import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import "./not-found.scss";

export default function NotFoundScreen() {
  return (
    <>
      <HelmetTitleBar title="Page not found - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="contain-page-not-found">
            <div className="title-page-bar">
              <span>Sorry, this page isn't available.</span>
            </div>
            <div className="detail-page-bar">
              <p>
                The link you followed may be broken, or the page may have been
                removed. Go back to Instagram.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
