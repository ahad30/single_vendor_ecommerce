/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  const onChange: PaginationProps["onChange"] = (page) => {
    setPageNumber(page);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
  
      },
      { replace: true  }
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const page = parseInt(pageParam);
      if (page !== pageNumber) {
        setPageNumber(page);
      }
    } else {
      setPageNumber(1);
    }
  }, [location.search]);

  return (
    <div className="my-5 flex justify-center items-center">
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
