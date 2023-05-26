import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import { Row, Col } from "reactstrap";
import "./explore.scss";

export default function ExploreScreen() {
  return (
    <>
      <HelmetTitleBar title="Explore - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="main-width-explorer">
            <div className="box-list-all-media">
              <Row>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
                <Col xl="4" lg="4" md="4">
                  <div className="box-media-explorer">A</div>
                </Col>
              </Row>
            </div>
            <div className="content-footer">
              <span>@2023 Instagram Clone developed by Alvin</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
