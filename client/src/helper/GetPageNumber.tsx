import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const GetPageNumber = (l) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const location = useLocation();

  return useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const pageNumber = page ? parseInt(page, 10) : 1;
    console.log(pageNumber);
    setPageNumber(pageNumber);
  }, [location.search , l]);
};

export default GetPageNumber;
