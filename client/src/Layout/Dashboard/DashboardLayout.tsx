import { Outlet } from "react-router-dom";
// import DashboardSidebar from "./DashboardSidebar";
import DashboardSidebarTwo from "./DashboardSidebarTwo";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <DashboardSidebarTwo></DashboardSidebarTwo>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
