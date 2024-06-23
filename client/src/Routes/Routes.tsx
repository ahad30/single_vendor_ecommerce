import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import HomeLayout from "../Layout/Home/HomeLayout";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./Admin.Routes";
import { TRoutesData } from "../types/sidebarAndRouesTypes";
import Home from "../Pages/Home/Home";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";
import AdminProtectedRoute from "./AdminPanelProtectedRoutes/AdminProtectedRoute";
import ErrorPageDashboard from "../Pages/Error/ErrorPageDashboard";
import CustomerDashboardLayout from "../Layout/Dashboard/CustomerDashboardLayout";
import { CustomerRoutes } from "./Customer.Routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <DashboardLayout />
      </AdminProtectedRoute>
    ),
    children: routesGenerator(adminRoutes as TRoutesData[]),
    errorElement: <ErrorPageDashboard />,
  },
  {
    path: "/user",
    children: routesGenerator(CustomerRoutes as TRoutesData[]),
    element: (
      <ProtectedRoutes role="customer">
        <CustomerDashboardLayout />
      </ProtectedRoutes>
    ),
  },
]);
