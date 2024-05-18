import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex" >
      <DashboardSidebar></DashboardSidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
