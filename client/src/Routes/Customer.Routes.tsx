import { CiBoxList } from "react-icons/ci";
import { TbMapDollar } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import CustomerDashboardStatics from "../Pages/Dashboard/User/Dashboard/CustomerDashboardStatics";
import UserProfile from "../Pages/Dashboard/User/Profile/UserProfile";
import { IoHomeOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { BsTicket } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

export const CustomerRoutes = [
  {
    path: "/user",
    label: "Dashboard",
    element: <CustomerDashboardStatics></CustomerDashboardStatics>,
    icon: <IoHomeOutline />,
  },
  {
    path: "user-profile",
    label: "Profile",
    element: <UserProfile></UserProfile>,
    icon: <AiOutlineUser />,
  },
  {
    path: "payment-log",
    label: "Payment Log",
    element: <UserProfile></UserProfile>,
    icon: <TbMapDollar />,
  },
  {
    path: "order-log",
    label: "Order Log",
    element: <UserProfile></UserProfile>,
    icon: <CiBoxList />,
  },
  {
    path: "review-products",
    label: "Review Products",
    element: <UserProfile></UserProfile>,
    icon: <IoStarSharp />,
  },
  {
    path: "support-tickets",
    label: "Support Tickets",
    element: <UserProfile></UserProfile>,
    icon: <BsTicket />,
  },
  {
    path: "change-password",
    label: "Change Password",
    element: <UserProfile></UserProfile>,
    icon: <IoKeyOutline />,
  },
  {
    path: "sign-out",
    label: "Sign Out",
    element: <UserProfile></UserProfile>,
    icon: <AiOutlineLogout />,
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
