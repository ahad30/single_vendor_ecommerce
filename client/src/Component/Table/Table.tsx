import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import UpdatePagination from "../Dashborad/UpdatePagination";

const Table = ({ data, columns }) => {
  // console.log(columns);
  // console.log(data);
  if (Array.isArray(data) == false) {
    return <h1>No date Found</h1>;
  }
  if (Array.isArray(data) && data.length === 0) {
    return <h1>No date Found</h1>;
  }
  return (
    <div className="pb-12">
      <Card
        className="h-[70vh] w-full overflow-scroll"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {columns?.map((head) => (
                <th
                  key={head?.value}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal  leading-none opacity-70 ${
                      head.value === "action" ? "text-end lg:px-12" : ""
                    }`}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head?.name}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item?.id}>
                  {columns?.map((column, index) => {
                    // action td start
                    if (column.value === "action") {
                      return (
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <div className="flex justify-end items-center gap-x-2 lg:px-12">
                              <Tooltip content="Edit" placement="top">
                                <IconButton
                                  color="blue"
                                  placeholder={undefined}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  <CiEdit size={20}></CiEdit>
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete" placement="top">
                                <IconButton
                                  color="red"
                                  placeholder={undefined}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  <AiOutlineDelete size={20}></AiOutlineDelete>
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Typography>
                        </td>
                      );
                    } else {
                      return (
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {column?.value === "image" ? (
                              <img
                                className="size-10"
                                src={`${import.meta.env.VITE_IMAGE_URL}${
                                  item[column?.value]
                                }`}
                                alt=""
                              />
                            ) : (
                              <span>{item[column?.value]}</span>
                            )}
                          </Typography>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <UpdatePagination></UpdatePagination>
    </div>
  );
};

export default Table;
