import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useGetAllPermissionsQuery } from "../Redux/Feature/Admin/UserManagement/rolesApi";
import { TAllPermission, TPermissions } from "../types/permission.types";

interface PermissionContextValue {
  loggedInUserPermissions: string[];
  setLoggedInUserPermissions: Dispatch<SetStateAction<string[]>>;
  handleCheckPermissions: (item: TAllPermission) => boolean;
}

const defaultPermissionContextValue: PermissionContextValue = {
  loggedInUserPermissions: [],
  setLoggedInUserPermissions: () => [],
  handleCheckPermissions: (item: TAllPermission) => true || false,
};

export const PermissionContextProvider = createContext<PermissionContextValue>(
  defaultPermissionContextValue
);

const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUserPermissions, setLoggedInUserPermissions] = useState<
    string[]
  >([]);
  const [allPermissions, setAllPermissions] = useState<string[]>([]);
  const {
    data: allPermissionData,
    isLoading,
    isFetching,
  } = useGetAllPermissionsQuery(undefined);

  

  useEffect(() => {
    if (
      Array.isArray(allPermissionData?.data) &&
      allPermissionData?.data?.length > 0
    ) {
      setAllPermissions(allPermissionData?.data?.map((item) => item?.name));
    }
  }, [allPermissionData, allPermissionData?.data]);
console.log(allPermissionData)
  const handleCheckPermissions = (item: TAllPermission) => {
    if (allPermissions?.length > 0 ) {
      console.log("sfssdfsf")
      // if (item == "view dashboard") {
      //   console.log(item)
      //   return true;
      // }
      const checkInAllPermissions = allPermissions.some(
        (permission) => permission == item
      );
      const checkInLoggedInUserPermissions = loggedInUserPermissions.some(
        (per) => per == item
      );
      if (checkInAllPermissions && checkInLoggedInUserPermissions) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const value = {
    loggedInUserPermissions,
    setLoggedInUserPermissions,
    handleCheckPermissions: handleCheckPermissions,
  };
  return (
    <PermissionContextProvider.Provider value={value}>
      {children}
    </PermissionContextProvider.Provider>
  );
};

export default PermissionProvider;
