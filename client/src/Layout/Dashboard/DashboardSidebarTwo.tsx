import React from "react";
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

const DashboardSidebarTwo = ({
  isSidebarOpen,
  className
}: {
  isSidebarOpen?: boolean;
  className? : string
}) => {
  const [open, setOpen] = React.useState("");
  const handleOpen = (value: string) => {
    setOpen(open === value ? "" : value);
  };
  const sidebarData = sidebarGenerator(adminRoutes as TRoutesData[]);
  // console.log(sidebarData)

  return (
    <Card
      className={`h-[calc(100vh-2rem)] ${className}  z-10 ${isSidebarOpen ?  "-ml-[500px]" : ""} max-w-[20rem] p-4 shadow-xl  shadow-blue-gray-900/5 duration-300`}
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
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {sidebarData.map((item) => {
          if (item.children) {
            return (
              <Accordion
                open={open === item.key}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === item.key ? "rotate-180" : ""
                    }`}
                  />
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItem
                  className="p-0"
                  selected={open === item.key}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(item.key)}
                    className="border-b-0 p-3"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <ListItemPrefix
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {/* <PresentationChartBarIcon className="h-5 w-5" /> */}
                      {item?.icon}
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {item.label}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List
                    className="p-0"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item.children.map((subItem) => (
                      <Link to={subItem.key}>
                        <ListItem
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
                          {subItem.label}
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            );
          } else {
            return (
              <Link to={item.key}>
                <ListItem
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
                    {item.icon}
                  </ListItemPrefix>
                  {item.label}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    children={undefined}
                  ></ListItemSuffix>
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
