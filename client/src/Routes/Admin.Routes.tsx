import Category from "../Pages/Home/Category/Category";
import { MdOutlineCategory } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Settings from "../Pages/Dashboard/Admin/Settings/Settings";

export const adminRoutes = [
  {
    path: "category",
    label: "Category",
    element: <Category></Category>,
    icon: <MdOutlineCategory size={20}></MdOutlineCategory>,
  },
  {
    path: "brand",
    label: "Brand",
    element: <Category></Category>,
    icon: <MdOutlineCategory size={20}></MdOutlineCategory>,
  },
  {
    label: "Settings",
    icon: <CiSettings size={20}></CiSettings>,
    children: [
      { path: "db-backup", label: "DB Backup", element: <Settings></Settings> },
      { path: "personal-details", label: "Personal Details", element: <Settings></Settings> },
    ],
  },
];


