import React from "react";
import PageAllProfile from "../../components/PageAllProfile";
import HelmetTitleBar from "../../components/TitleBar";
import "./who-can-see.scss";

export default function WhoCanSeeYou() {
  return (
    <>
      <HelmetTitleBar title="Who can see your content - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>Who can see your content</span>
        </div>
        <div className="body-overview">
          <div className="title-body-overview">
            <span>Account privacy</span>
          </div>
          <div className="description-page">
            <p>
              {`When your account is public, your profile and posts can be seen by
              anyone, on or off Instagram, even if they don’t have an Instagram
              account. When your account is private, only the followers you
              approve can see what you share, including your photos or videos on
              hashtag and location pages, and your followers and following
              lists.`}
            </p>
          </div>
        </div>
      </PageAllProfile>
    </>
  );
}
