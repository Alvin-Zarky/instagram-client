import React from "react";
import AppRoutes from "./routers";
import AppProviders from "./provider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppProviders>
        <AppRoutes />
        <ToastContainer />
      </AppProviders>
    </>
  );
}

export default App;
