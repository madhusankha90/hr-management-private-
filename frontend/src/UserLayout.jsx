import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";

const UserLayout = () => {

  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  
  return (
    <div className="bg-slate-100 flex min-h-screen flex-col">
      <div className="flex-grow flex">
      <SideMenu  setActiveMenuItem={setActiveMenuItem}/>
        <div className="flex-grow">
          <Header title={activeMenuItem}/>
          <div className="flex-grow p-5">
          {/* <div className="flex-grow p-4 h-[65vh]"> */}
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

