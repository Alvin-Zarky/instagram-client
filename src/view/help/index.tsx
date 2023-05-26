import React from "react";
import "./help.scss";
import PageAllProfile from "../../components/PageAllProfile";
import HelmetTitleBar from "../../components/TitleBar";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import {
  HELP_CENTER,
  PRIVACY_SECURITY_HELP,
  SUPPORT_REQUEST,
} from "../../constant/constant";

export default function Help() {
  return (
    <>
      <HelmetTitleBar title="Help - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>Help</span>
        </div>
        <div className="body-overview">
          <div className="help-body-partial">
            <a target="blank" href={HELP_CENTER}>
              <div className="help-center">
                <div>
                  <span>Help Center</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </div>
            </a>
            <a target="blank" href={PRIVACY_SECURITY_HELP}>
              <div className="help-center">
                <div>
                  <span>Privacy and Security Help</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </div>
            </a>
            <a target="blank" href={SUPPORT_REQUEST}>
              <div className="help-center">
                <div>
                  <span>Support Requests</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </div>
            </a>
          </div>
        </div>
      </PageAllProfile>
    </>
  );
}
