import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminSideMenu from "./components/admin/AdminSideMenu";


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow flex">
        <AdminSideMenu />
        <div className="flex-grow">
          <Header />
          <div className="flex-grow p-6">
            <Outlet />
            <Footer />
            
          </div>
        
         
          
          
        </div>
      
      </div>
      
    </div>
  );
};

export default AdminLayout;
