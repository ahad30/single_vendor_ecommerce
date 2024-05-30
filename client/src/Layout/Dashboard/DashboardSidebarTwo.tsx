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
import { Link } from "react-router-dom";
import { TRoutesData } from "../../types/sidebarAndRouesTypes";
import { PermissionContextProvider } from "../../contex/PermissionProvider";
import { TAllPermission } from "../../types/permission.types";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";

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

  const [open, setOpen] = React.useState("");
  const [newSidebar, setNewSidebar] = useState([]);
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
  console.log(user);
  // h-[calc(100vh-2rem)]
  return (
    <Card
      className={` h-screen ${className}  z-10 ${
        isSidebarOpen ? "-ml-[500px]" : ""
      } max-w-[20rem] rounded-none duration-300 bg-[#162447]`}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Sidebar
        </Typography>
      </div>
      <List
        className="m-0 p-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {actualSideBar?.map((item) => {
          if (item?.children) {
            return (
              <Accordion
                className="text-gray-200 p-0 m-0 hover:bg-green-500"
                key={item?.key}
                open={open === item?.key}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === item?.key ? "rotate-180" : ""
                    }`}
                  />
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItem
                  className=" p-0 m-0 hover:bg-purple-500 text-gray-200"
                  selected={open === item?.key}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(item?.key)}
                    className="text-gray-200 p-0 m-0 hover:bg-red-300 border-b-0"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <ListItemPrefix
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {item?.icon}
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto text-gray-300 font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {item?.label}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="">
                  <List
                    className="p-0 m-0"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item?.children?.map((subItem) => (
                      <Link to={subItem.key}>
                        <ListItem
                          className="text-gray-200 m-0 p-0"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <ListItemPrefix
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          {subItem?.label}
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            );
          } else {
            return (
              <Link key={item?.key} to={item?.key}>
                <ListItem
                  className="text-gray-200 p-0 m-0"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItemPrefix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {/* <InboxIcon className="h-5 w-5" />
                     */}
                    {item?.icon}
                  </ListItemPrefix>
                  {item?.label}
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
    </Card>
  );
};

export default DashboardSidebarTwo;
