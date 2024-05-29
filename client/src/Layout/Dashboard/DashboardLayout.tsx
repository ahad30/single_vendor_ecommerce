import { Outlet } from "react-router-dom";
// import DashboardSidebar from "./DashboardSidebar";
import DashboardSidebarTwo from "./DashboardSidebarTwo";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen , setIsSidebarOpen] = useState(false)
  return (
   <>
       <div className="flex max-w-[1600px] mx-auto">
      <div className="hidden lg:block">
        <DashboardSidebarTwo></DashboardSidebarTwo>
      </div>
      {/* <div className="lg:hidden">
        <DashboardSidebarTwo className={"absolute"} isSidebarOpen={isSidebarOpen} ></DashboardSidebarTwo>
      </div> */}
      <div className=" mt-12 px-5 w-full">
        <Outlet></Outlet>
      </div>
    </div>
   </>
  );
};

export default DashboardLayout;
