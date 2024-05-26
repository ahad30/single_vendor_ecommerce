import {
  MdOutlineCategory,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Category from "../Pages/Dashboard/Admin/Category/Category";
import DbBackup from "../Pages/Dashboard/Admin/Settings/DbBackup";
import AdminProfile from "../Pages/Dashboard/Admin/Settings/AdminProfile";
import DashboardStatics from "../Pages/Dashboard/Admin/DashboardStatics/DashboardStatics";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export const adminRoutes = [
  {
    path: "/admin",
    label: "Dashboard",
    element: <DashboardStatics></DashboardStatics>,
    icon: <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>,
  },
  // {
  //   path: "categories",
  //   label: "Category",
  //   element: <Category></Category>,
  //   icon: <MdOutlineCategory size={20}></MdOutlineCategory>,
  // },

  {
    label: "E-commerce",
    icon: (
      <MdOutlineShoppingCartCheckout size={20}></MdOutlineShoppingCartCheckout>
    ),
    children: [
      {
        path: "categories",
        label: "Category",
        element: <Category></Category>,
      },
    ],
  },

  {
    label: "Configuration",
    icon: <CiSettings size={20}></CiSettings>,
    children: [
      { path: "db-backup", label: "DB Backup", element: <DbBackup></DbBackup> },
      {
        path: "admin-profile",
        label: "Admin Profile",
        element: <AdminProfile></AdminProfile>,
      },
    ],
  },
];
