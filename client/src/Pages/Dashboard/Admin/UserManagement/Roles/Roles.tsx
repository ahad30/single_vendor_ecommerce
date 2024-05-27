import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { RootState } from "../../../../../Redux/store";
import { TRoles } from "../../../../../types";
import { useGetAllRolesQuery } from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../../Redux/Feature/Modal/modalSlice";
import Table from "../../../../../Component/Table/Table";
import { TMeta } from "../../../../../types/globalTypes";
import SearchBar from "../../../../../Component/SearchBar/SearchBar";
import DashboardTitle from "../../../../../Component/Dashborad/DashboardTitle";
import ButtonWithModal from "../../../../../Component/Button/ButtonWithModal";
import TableTabs from "../../../../../Component/Dashborad/TableTabs";
import AddModal from "../../../../../Component/Modal/AddModal";
import AddRoles from "./AddRoles";

const Roles = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TRoles | null>(null);
  const { data, isLoading, isFetching } = useGetAllRolesQuery([
    { name: "page", value: pageNumber },
  ]);
  const handleEditAndDelete = (data: TRoles, name: "delete" | "edit") => {
    setSingleData(data);
    if (name === "delete") {
      console.log("delete", data);
      dispatch(setIsDeleteModalOpen());
    } else if (name === "edit") {
      console.log("edit", data);
      dispatch(setIsEditModalOpen());
    }
  };
  const columns = [
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];
  return (
    <div className="">
      <DashboardTitle windowTitle="Roles" text="Total Role">
        {data?.meta?.total || data?.data?.length || 0}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Role"></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TRoles>
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        meta={data?.meta as TMeta}
        data={data?.data || []}
        onDeleteAndEdit={handleEditAndDelete}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      ></Table>
      {/* add category modal */}
      <AddModal
        width={1000}
        isAddModalOpen={isAddModalOpen}
        title="Create role"
      >
        <AddRoles></AddRoles>
      </AddModal>
      {/* edit category modal */}
      {/* <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
    <EditCategory<TCategory>
      itemData={singleData as TCategory}
    ></EditCategory>
  </EditModal> */}
      {/* delete category */}
      {/* <DeleteModal
    data={dCData}
    error={error as TError}
    isLoading={dCIsloading}
    isSuccess={isSuccess}
    title="Delete Category"
    onDelete={handleDelete}
    isDeleteModalOpen={isDeleteModalOpen}
    isError={isError}
    description={"Under the category corresponding data will be removed "}
  ></DeleteModal> */}
    </div>
  );
};

export default Roles;
