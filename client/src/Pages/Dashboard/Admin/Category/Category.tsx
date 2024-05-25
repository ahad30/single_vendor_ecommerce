import { useState } from "react";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import AddModal from "../../../../Component/Modal/AddModal";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import Table from "../../../../Component/Table/Table";
import { useGetCategoriesQuery } from "../../../../Redux/Feature/Admin/category/categoryApi";
import { useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import AddCategory from "./AddCategory";
import GetPageNumber from "../../../../helper/GetPageNumber";
import { useLocation } from "react-router-dom";

const Category = () => {
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const loaction = useLocation();
  console.log(loaction.search);
  // console.log(pageNumber)

  const { data } = useGetCategoriesQuery([{ name: "page", value: 1 }]);
  const [singleData, setSingleData] = useState({});
  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];

  return (
    <div className="mt-12 px-5">
      <DashboardTitle text=" Total Category">12</DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>
      <Table columns={columns} data={data?.data[0]?.categories}></Table>
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Category">
        <AddCategory></AddCategory>
      </AddModal>
    </div>
  );
};

export default Category;

type Tdata = {
  nmae: string;
  age: string;
};
