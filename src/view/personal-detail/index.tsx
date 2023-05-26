import React from "react";
import "./personal-detail.scss";
import PageAllProfile from "../../components/PageAllProfile";
import HelmetTitleBar from "../../components/TitleBar";
import { useAppSelector } from "../../app/hooks";
import DateTimeFormater from "../../utility/date";

export default function PersonalDetail() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <HelmetTitleBar title="Personal Details - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>Personal Details</span>
        </div>
        <div className="body-overview">
          <div className="box-personal-detail">
            <div className="box-detail">
              <h4>Contact Info</h4>
              <span>{user?.email}</span>
            </div>
            <div className="box-detail">
              <h4>Dated joined</h4>
              <span>
                {new DateTimeFormater().dateTimeConvert(user?.createdAt)}
              </span>
            </div>
            <div className="box-detail">
              <h4>Account based in</h4>
              <span>Cambodia</span>
            </div>
          </div>
        </div>
      </PageAllProfile>
    </>
  );
}
