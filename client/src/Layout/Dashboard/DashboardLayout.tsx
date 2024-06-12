import { Outlet } from "react-router-dom";
import DashboardSidebarTwo from "./DashboardSidebarTwo";
import { useState } from "react";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex max-w-[1600px] mx-auto">
      <div className="hidden  lg:block">
        <DashboardSidebarTwo></DashboardSidebarTwo>
      </div>

      {/* for mobile */}
      <div className="lg:hidden">
        <DashboardSidebarTwo
          className={`absolute duration-700 ${
            isSidebarOpen ? "" : "-ml-[500px]"
          }`}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        ></DashboardSidebarTwo>
      </div>

      <div className="relative thin-scrollbar h-screen overflow-y-scroll w-full">
        <div className="w-full text-gray-900">
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          ></Navbar>
        </div>
        <div className="mt-12 bg-[#F3F5F7] px-5 w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
