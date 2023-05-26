import React from "react";
import "./what-you-see.scss";
import PageAllProfile from "../../components/PageAllProfile";
import HelmetTitleBar from "../../components/TitleBar";
import Switch from "@mui/material/Switch";
import { SUPPORT_SETTING } from "../../constant/constant";
import { useUpdateSettingLike } from "../../hook/user/useUpdateHideLike";
import useAuthen from "../../hook/auth/useAuth";

export default function WhatYouSee() {
  const { userProfileQuery } = useAuthen();
  const { data } = userProfileQuery;

  const updateHideLike = useUpdateSettingLike();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateHideLike.mutate(e.target.checked);
  };

  return (
    <>
      <HelmetTitleBar title="What you see - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>What you see</span>
        </div>
        <div className="body-overview">
          <div className="title-body-overview">
            <span>Likes and Views</span>
          </div>
          <div className="flex-body-overview">
            <div>
              <span>Hide likes</span>
            </div>
            <div>
              <Switch
                checked={data?.isHideLike || false}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="description-page">
            <p>
              The number of likes on posts from other accounts will be hidden.
              You can hide the number of likes on your own posts by going to
              Advanced Settings before sharing
            </p>
          </div>
          <div className="supporting-help">
            <span>Privacy and security help</span>
          </div>
          <div className="supporting-link">
            <a target="blank" href={SUPPORT_SETTING}>
              <span>Support</span>
            </a>
          </div>
        </div>
      </PageAllProfile>
    </>
  );
}
