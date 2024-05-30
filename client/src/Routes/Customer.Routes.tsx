
import DashboardStatics from "../Pages/Dashboard/Admin/DashboardStatics/DashboardStatics";
import { MdOutlineDashboardCustomize } from "react-icons/md";


export const CustomerRoutes = [
  {
    path: "/user",
    label: "Dashboard",
    element: <DashboardStatics></DashboardStatics>,
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
