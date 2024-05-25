import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdatePagination = () => {
  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    setCurrent(pageParam ? parseInt(pageParam) : 1);
  }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", current);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  }, [location, current]);

  return (
    <div className=" mt-5 flex justify-center items-center">
      <Pagination current={current} onChange={onChange} total={50} />
    </div>
  );
};

export default UpdatePagination;
