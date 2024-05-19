import { MdOutlineCategory } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Settings from "../Pages/Dashboard/Admin/Settings/Settings";
import Category from "../Pages/Dashboard/Admin/Category/Category";
import DbBackup from "../Pages/Dashboard/Admin/Settings/DbBackup";
import AdminProfile from "../Pages/Dashboard/Admin/Settings/AdminProfile";

export const adminRoutes = [
  {
    path: "category",
    label: "Category",
    element: <Category></Category>,
    icon: <MdOutlineCategory size={20}></MdOutlineCategory>,
  },

  {
    label: "Settings",
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
