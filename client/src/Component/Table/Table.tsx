/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import UpdatePagination from "../Dashborad/UpdatePagination";
import { TMeta } from "../../types/globalTypes";
import { Dispatch, SetStateAction } from "react";
import Skeleton from "../Dashborad/Skeleton/Skeleton";
import { Image } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export type TColumn = {
  name: string;
  value: "action" | string | "image";
};

type TableProps<T> = {
  data: T[];
  columns: TColumn[];
  meta: TMeta;
  onDeleteAndEdit: (data: T, name: "edit" | "delete") => void;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
  isLoading: boolean;
  handleViewModal?: (data: T) => void;
  defaultKey?: string;
};

const Table = <T extends { id: string | number; [key: string]: any }>({
  data,
  columns,
  onDeleteAndEdit,
  meta,
  setPageNumber,
  pageNumber,
  isLoading,
  isFetching,
  handleViewModal,
  defaultKey,
}: TableProps<T>) => {
  if (isLoading || isFetching) {
    return <Skeleton></Skeleton>;
  }

  if (Array.isArray(data) == false || data.length === 0) {
    return <h1>No data Found</h1>;
  }
  return (
    <div className="pb-12 ">
      <Card
        className="w-full overflow-scroll "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {columns?.map((head) => (
                <th
                  key={head?.value as string}
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
                  {columns?.map((column) => {
                    // action td start
                    if (column.value === "action" && onDeleteAndEdit) {
                      return (
                        <td key={column.value} className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <div className="flex justify-end items-center gap-x-2 lg:px-12">
                              {/* view */}
                              {defaultKey == "products" && item?.slug && (
                                <Tooltip content="View Product" placement="top">
                                  <Link
                                    to={`/admin/view-product-details/${item.slug}/${item.id}`}
                                  >
                                    <IconButton
                                      color="green"
                                      placeholder={undefined}
                                      onPointerEnterCapture={undefined}
                                      onPointerLeaveCapture={undefined}
                                    >
                                      <IoEyeOutline size={20} />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                              )}
                              <Tooltip content="Edit" placement="top">
                                <IconButton
                                  onClick={() => onDeleteAndEdit(item, "edit")}
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
                                  onClick={() =>
                                    onDeleteAndEdit(item, "delete")
                                  }
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
                        <td key={column.value} className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {column?.name === "Image" ? (
                              <Image
                                width={40}
                                height={40}
                                // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                src={`${import.meta.env.VITE_IMAGE_URL}${
                                  item[column?.value]
                                }`}
                              />
                            ) : column.value === "view" && handleViewModal ? (
                              <span
                                onClick={() => {
                                  handleViewModal(item);
                                }}
                                className="border cursor-pointer border-blue-400 px-7 py-1 rounded-full"
                              >
                                view all
                              </span>
                            ) : (
                              <p>
                                {item[column?.value] === "Variant" ? (
                                  <p>
                                    {`${item[column?.value]}`}
                                    <br />
                                    <span className="font-bold">
                                      Total Variants:
                                      {item["variants"].total_variants}
                                    </span>
                                  </p>
                                ) : item[column?.value] == 1 &&
                                  column?.name == "Status" ? (
                                  <span className="bg-green-400 text-white px-5 rounded-md py-1">
                                    Active
                                  </span>
                                ) : item[column?.value] == 0 &&
                                  column?.name === "Status" ? (
                                  <span className="bg-red-400 text-white px-5 rounded-md py-1">
                                    Inactive
                                  </span>
                                ) : (
                                  item[column?.value]
                                )}
                              </p>
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
        {meta?.total && (
          <UpdatePagination
            meta={meta}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          ></UpdatePagination>
        )}
      </Card>
    </div>
  );
};

export default Table;
