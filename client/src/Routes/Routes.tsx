import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import HomeLayout from "../Layout/Home/HomeLayout";
import Home from "../Pages/Home/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
       {
        path: "/",
        element: <Home></Home>

       },
       {

       }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <DashboardLayout></DashboardLayout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoutes role="user">
        <DashboardLayout></DashboardLayout>
      </ProtectedRoutes>
    ),
  },
]);
