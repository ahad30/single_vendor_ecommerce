

import { MdOutlineDashboardCustomize } from "react-icons/md";
import CustomerDashboardStatics from "../Pages/Dashboard/User/Dashboard/CustomerDashboardStatics";
import UserProfile from "../Pages/Dashboard/User/Profile/UserProfile";


export const CustomerRoutes = [
  {
    path: "/user",
    label: "Dashboard",
    element: <CustomerDashboardStatics></CustomerDashboardStatics>,
    icon: <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>,
  },
  {
    path: "/user-profile",
    label: "Profile",
    element: <UserProfile></UserProfile>,
    icon: <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>,
  },


//   {
//     label: "E-commerce",
//     icon: (
//       <MdOutlineShoppingCartCheckout size={20}></MdOutlineShoppingCartCheckout>
//     ),
//     children: [
//       {
//         path: "categories",
//         label: "Category",
//         element: <Category></Category>,
//         permissionName: "view category",
//       },
//       {
//         path: "brands",
//         label: "Brands",
//         element: <Brand></Brand>,
//         permissionName: "view brand",
//       },
//     ],
//   },
];
