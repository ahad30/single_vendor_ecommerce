import { Outlet } from "react-router-dom";
import { CustomerRoutes } from "../../Routes/Customer.Routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";

const CustomerDashboardLayout = () => {
  const sidebarData = sidebarGenerator(CustomerRoutes)
  console.log(sidebarData)
  return (
    <div>
      <div>sidevar</div>
      <Outlet></Outlet>
    </div>
  );
};

export default CustomerDashboardLayout;
