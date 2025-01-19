import { formToJSON } from "axios";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./index.css";

const App = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
