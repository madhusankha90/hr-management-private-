import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import AdminSideMenu from "./components/admin/AdminSideMenu";
import AdminHeader from "./components/admin/AdminHeader";


const AdminLayout = () => {

  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow flex">
        <AdminSideMenu setActiveMenuItem={setActiveMenuItem}/>
        <div className="flex-grow">
          <AdminHeader title={activeMenuItem}/>
          <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <Outlet />
            <Footer />
            
          </div>
        
         
          
          
        </div>
      
      </div>
      
    </div>
  );
};

export default AdminLayout;
