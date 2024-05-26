import { useState } from "react";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import AddModal from "../../../../Component/Modal/AddModal";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import Table from "../../../../Component/Table/Table";
import { useGetCategoriesQuery } from "../../../../Redux/Feature/Admin/category/categoryApi";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import AddCategory from "./AddCategory";
import { TCategory } from "../../../../types";
import { TMeta } from "../../../../types/globalTypes";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../Redux/Feature/Modal/modalSlice";
const Category = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const { data } = useGetCategoriesQuery([{ name: "page", value: 1 }]);
  const [singleData, setSingleData] = useState<TCategory | null>(null);
  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];
  const handleEditAndDelete = (data: TCategory, name: "delete" | "edit") => {
    setSingleData(data);
    if (name === "delete") {
      console.log("delete", data)
      dispatch(setIsDeleteModalOpen());
    } else if (name === "edit") {
      console.log("edit", data)
      dispatch(setIsEditModalOpen());
    }
  };
  return (
    <div className="mt-12 px-5">
      <DashboardTitle text=" Total Category">12</DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>
      <Table<TCategory>
        columns={columns}
        meta={data?.meta as TMeta}
        data={data?.data || []}
        onDeleteAndEdit={handleEditAndDelete}
      ></Table>
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Category">
        <AddCategory></AddCategory>
      </AddModal>
    </div>
  );
};

export default Category;
