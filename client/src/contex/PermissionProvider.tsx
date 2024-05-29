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
  setLoggedInUserPermissions: Dispatch<SetStateAction<string[]>>; //
}

const defaultPermissionContextValue: PermissionContextValue = {
  loggedInUserPermissions: [],
  setLoggedInUserPermissions: () => [],
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

  const handleCheckPermissions = (item: TAllPermission) => {
    console.log(item);
  };

  useEffect(() => {
    if (
      Array.isArray(allPermissionData?.data) &&
      allPermissionData?.data?.length > 0
    ) {
      setAllPermissions(allPermissionData?.data?.map((item) => item?.name));
    }
  }, [allPermissionData, allPermissionData?.data]);
  
  const value = {
    loggedInUserPermissions,
    setLoggedInUserPermissions,
    handleCheckPermissions,
  };
  return (
    <PermissionContextProvider.Provider value={value}>
      {children}
    </PermissionContextProvider.Provider>
  );
};

export default PermissionProvider;
