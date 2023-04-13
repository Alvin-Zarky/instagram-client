import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./assets/scss/style.scss";
import "./assets/scss/responsive.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <>
    <App />
  </>
);

reportWebVitals();
