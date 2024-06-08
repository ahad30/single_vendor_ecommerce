import { Outlet } from "react-router-dom";

import CustomerDashboardSidebar from "./CustomerDashboardSidebar";

const CustomerDashboardLayout = () => {

  return (
    <div className="bg-[#f0f5fc] p-7 min-h-screen flex justify-between">
      <div><CustomerDashboardSidebar /></div>
      <Outlet></Outlet>
    </div>
  );
};

export default CustomerDashboardLayout;
