import React from "react";
import { Helmet } from "react-helmet";
import { HelmetBar } from "../../types/authentication";

const HelmetTitleBar = ({ title }: HelmetBar) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
  </Helmet>
);

export default HelmetTitleBar;
