/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../Redux/Feature/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useGetLoggedInUserQuery } from "../../Redux/Feature/auth/authApi";
import LoadingPage from "../../Layout/Dashboard/LoadingPage";
import { PermissionContextProvider } from "../../contex/PermissionProvider";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, isFetching, refetch } =
    useGetLoggedInUserQuery(undefined);
  const { setLoggedInUserPermissions } = useContext(PermissionContextProvider);
  useEffect(() => {
    if (user && token) {
      refetch();
      setLoading(false);
    }
  }, [user, token, refetch]);
  useEffect(() => {
    if (Array.isArray(data?.data?.role) && data?.data?.role?.length > 0) {
      const arr = data?.data?.role;
      const array: string[] = [];
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        element.permissions.forEach((item) => array.push(item?.name));
      }
      setLoggedInUserPermissions([...array]);
    }
  }, [data?.data?.role, data?.data]);

  if (!token || token == null || user == null) {
    return <Navigate to={"/login"}></Navigate>;
  }
  if (isLoading || isFetching || loading) {
    return <LoadingPage></LoadingPage>;
  }
  // console.log(data?.data?.role)
  if (!Array.isArray(data?.data?.role) || data?.data?.role.length == 0) {
    dispatch(logout());
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};
export default AdminProtectedRoute;
