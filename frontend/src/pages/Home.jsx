// Home.jsx
import React from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-slate-100 flex">
      <SideMenu />
      <div className="flex-grow">
        <Header />
      </div>
    </div>
  );
};

export default Home;
