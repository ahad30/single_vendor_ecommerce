import { Outlet } from "react-router-dom";

import CustomerDashboardSidebar from "./CustomerDashboardSidebar";

const CustomerDashboardLayout = () => {

  return (
    <div className="bg-[#f0f5fc] p-7 min-h-screen grid grid-cols-[1fr_3fr] gap-6">
      <div><CustomerDashboardSidebar /></div>
      <Outlet></Outlet>
    </div>
  );
};

export default CustomerDashboardLayout;
