import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
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
