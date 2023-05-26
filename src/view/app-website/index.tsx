import React, { useState } from "react";
import PageAllProfile from "../../components/PageAllProfile";
import HelmetTitleBar from "../../components/TitleBar";
import "./app-website.scss";

export default function AppAndWebsite() {
  const [slug, setSlug] = useState("active");
  return (
    <>
      <HelmetTitleBar title="Apps and Websites - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>Apps and Websites</span>
        </div>
        <div className="body-overview">
          <div className="tabbar-app-website">
            <ul>
              <li
                onClick={() => {
                  setSlug("active");
                }}
                className={`${slug === "active" ? "active" : "blur-active"}`}
              >
                <span>Active</span>
              </li>
              <li
                onClick={() => {
                  setSlug("expired");
                }}
                className={`${slug === "expired" ? "active" : "blur-active"}`}
              >
                <span>Expired</span>
              </li>
              <li
                onClick={() => {
                  setSlug("remove");
                }}
                className={`${slug === "remove" ? "active" : "blur-active"}`}
              >
                <span>Removed</span>
              </li>
            </ul>
          </div>
          <div className="content-description">
            <p>
              {slug === "active" && (
                <>
                  These are apps and websites you've connected to your Instagram
                  account. They can access non-public information that you
                  choose to share with them.
                </>
              )}
              {slug === "expired" && (
                <>
                  These are apps and websites you've connected to your Instagram
                  account that you may not have used in the last 90 days.
                  They're no longer able to access your non-public information,
                  but may still have the information you shared while they were
                  active. "Non-public" means information that an app can only
                  access if you choose to share it when you log in with your
                  Instagram account (like your email address).
                </>
              )}
              {slug === "remove" && (
                <>
                  These are apps and websites that are no longer connected to
                  your Instagram account. They can't access your non-public
                  information anymore, but may still have the information you
                  shared while they were active. "Non-public" means information
                  that an app can only access if you choose to share it when you
                  log in with your Instagram account (like your email address).
                  You can ask an app to delete your information. To do it,
                  review their Privacy Policy for details and contact
                  information. If you contact an app, they may need your User
                  ID.
                </>
              )}
            </p>
            <span>
              {slug === "active" && (
                <>
                  You have not authorized any applications to access your
                  Instagram account.
                </>
              )}
              {slug === "expired" && (
                <>
                  You have no expired applications that had access to your
                  Instagram account.
                </>
              )}
              {slug === "remove" && (
                <>
                  You have no removed applications that had access to your
                  Instagram account.
                </>
              )}
            </span>
          </div>
        </div>
      </PageAllProfile>
    </>
  );
}
