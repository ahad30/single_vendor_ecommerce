/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect } from "react";
import { useAppSelector } from "../../Redux/hook";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../Redux/Feature/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useGetLoggedInUserQuery } from "../../Redux/Feature/auth/authApi";
import LoadingPage from "../../Layout/Dashboard/LoadingPage";
import { PermissionContextProvider } from "../../contex/PermissionProvider";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, isFetching, isError } = useGetLoggedInUserQuery(
    undefined,
    {
      skip: user == null ? true : false,
    }
  );
  const { setLoggedInUserPermissions } = useContext(PermissionContextProvider);
  useEffect(() => {
    if (
      Array.isArray(data?.data?.role_name) &&
      data?.data?.role_name?.length > 0
    ) {
      const arr = data?.data?.role_name;
      const array: string[] = [];
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        element.permissions.forEach((item) => array.push(item?.name));
      }
      setLoggedInUserPermissions([...array]);
    }
  }, [data?.data?.role_name, data?.data]);
  if (!token || token == null || user == null) {
    return <Navigate to={"/login"}></Navigate>;
  }
  if (isLoading || isFetching) {
    return <LoadingPage></LoadingPage>;
  }
  if (
    !Array.isArray(data?.data?.role_name) ||
    data?.data?.role_name.length == 0
  ) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};
export default AdminProtectedRoute;
