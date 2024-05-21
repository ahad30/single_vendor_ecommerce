import { Outlet } from "react-router-dom";
// import DashboardSidebar from "./DashboardSidebar";
import DashboardSidebarTwo from "./DashboardSidebarTwo";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen , setIsSidebarOpen] = useState(false)
  return (
   <>
       <div className="flex">
      <div className="hidden lg:block">
        <DashboardSidebarTwo></DashboardSidebarTwo>
      </div>
      <div className="lg:hidden">
        <DashboardSidebarTwo className={"absolute"} isSidebarOpen={isSidebarOpen} ></DashboardSidebarTwo>
      </div>
      <div className=" w-full">
        <Outlet></Outlet>
      </div>
    </div>
   </>
  );
};

export default DashboardLayout;
