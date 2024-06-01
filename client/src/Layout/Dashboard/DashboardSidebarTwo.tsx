import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { adminRoutes } from "../../Routes/Admin.Routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { Link, useLocation } from "react-router-dom";
import { TRoutesData } from "../../types/sidebarAndRouesTypes";
import { PermissionContextProvider } from "../../contex/PermissionProvider";
import { TAllPermission } from "../../types/permission.types";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const DashboardSidebarTwo = ({
  isSidebarOpen,
  className,
}: {
  isSidebarOpen?: boolean;
  className?: string;
}) => {
  const { loggedInUserPermissions } = useContext(PermissionContextProvider);

  const handleCheckPermissions = (item: TAllPermission) => {
    if (loggedInUserPermissions.length > 0) {
      if (item == "view dashboard") {
        return true;
      }

      const checkInLoggedInUserPermissions = loggedInUserPermissions.find(
        (per) => per == item
      );
      if (checkInLoggedInUserPermissions) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const [open, setOpen] = React.useState(
    localStorage.getItem("sidebarOpen")
      ? localStorage.getItem("sidebarOpen")
      : ""
  );

  const [dropdownItem, setDropdownItem] = useState(
    localStorage.getItem("dropdownItem")
      ? localStorage.getItem("dropdownItem")
      : ""
  );

  useEffect(() => {
    localStorage.setItem("sidebarOpen", open as string);
    if (open) {
      localStorage.removeItem("dropdownItem");
      setDropdownItem("");
    }
  }, [open]);
  useEffect(() => {
    localStorage.setItem("dropdownItem", dropdownItem as string);
  }, [dropdownItem]);

  const handleOpen = (value: string) => {
    setOpen(open === value ? "" : value);
  };
  const sidebarData = sidebarGenerator(adminRoutes as TRoutesData[]);
  const actualSideBar = sidebarData
    ?.map((item) => {
      if (item?.permissionName) {
        item = {
          ...item,
          permission: handleCheckPermissions(
            item.permissionName as TAllPermission
          ),
        };
      } else if (item?.children) {
        item.children =
          item.children
            .map((child) => {
              return {
                ...child,
                permission: handleCheckPermissions(
                  child.permissionName as TAllPermission
                ),
              };
            })
            .filter((i) => i?.permission === true) || [];
        item = { ...item, permission: item.children.length > 0 ? true : false };
      }
      return item;
    })
    .filter((per) => per?.permission !== false);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div
      className={`w-[250px] z-10 pt-12 bg-[#162447] duration-300 ${className} h-screen thin-scrollbar overflow-y-scroll text-[13px] text-[#E0E0E0]`}
    >
      {actualSideBar.map((item) => {
        if (item.children) {
          return (
            <div key={item.key}>
              {/* dropdown header */}
              <div
                onClick={() => handleOpen(item.key)}
                className="px-4 cursor-pointer py-3 flex items-center justify-between mr-4 mb-1"
              >
                {/* text */}
                <div className="flex  items-center gap-x-2">
                  <span>{item.icon}</span>
                  <p className="">{item.label}</p>
                </div>
                {/* icon */}
                <p>
                  {open === item.key ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )}
                </p>
              </div>
              {/* dropDown menu */}
              <div
                className={`overflow-hidden transition-max-height ${
                  open === item.key
                    ? "max-h-96 opacity-100 opening"
                    : "max-h-0 opacity-0 closing"
                }`}
              >
                {item.children?.map((subItem) => (
                  <Link key={subItem.key} to={subItem.key} className="">
                    <div
                      onClick={() => setDropdownItem(subItem.key)}
                      className={`pl-7 py-2 mr-4 mb-1  ${
                        dropdownItem === subItem.key
                          ? "bg-[#323F5D] rounded-r-full"
                          : ""
                      }`}
                    >
                      <p className="">- {subItem.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        } else if (item.permissionName) {
          return (
            <Link to={item.key}>
              <div
                className={`px-4 py-3  mr-4 mb-1 ${
                  open === item.key ? "bg-[#323F5D] rounded-r-full" : ""
                }`}
              >
                <div
                  onClick={() => handleOpen(item.key)}
                  className="flex  items-center gap-x-2"
                >
                  <span>{item.icon}</span>
                  <p className="">{item.label}</p>
                </div>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default DashboardSidebarTwo;
