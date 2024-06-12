/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TMeta } from "../../types/globalTypes";

const UpdatePagination = ({
  meta,
  pageNumber,
  setPageNumber,
}: {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  meta: TMeta;
}) => {
  const onChange: PaginationProps["onChange"] = (page) => {
    setPageNumber(page);
  };

  console.log(pageNumber);

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    setPageNumber(pageParam ? parseInt(pageParam) : 1);
  }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber.toString());
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [location, pageNumber]);

  return (
    <div className=" my-5 flex justify-center items-center">
      <Pagination
        current={pageNumber}
        onChange={onChange}
        total={meta.total}
        pageSize={meta.per_page}
      />
    </div>
  );
};

export default UpdatePagination;
