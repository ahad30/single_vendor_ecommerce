import { ReactNode } from "react";
import { useAppSelector } from "../../Redux/hook";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../Redux/Feature/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useGetLoggedInUserQuery } from "../../Redux/Feature/auth/authApi";
import LoadingPage from "../../Layout/Dashboard/LoadingPage";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, isFetching } = useGetLoggedInUserQuery(undefined, {
    skip: user == null ? true : false,
  });

  if (!token || token == null || user == null) {
    return <Navigate to={"/login"}></Navigate>;
  }
  if (isLoading || isFetching) {
    return <div className="loader"></div>;
  }
  if (!Array.isArray(data.data.role_name) && data.data.role_name.length == 0) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};
export default AdminProtectedRoute;
