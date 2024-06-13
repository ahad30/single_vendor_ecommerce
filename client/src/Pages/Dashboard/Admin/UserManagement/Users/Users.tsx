import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { RootState } from "../../../../../Redux/store";
import { TUser } from "../../../../../types";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../../Redux/Feature/Admin/UserManagement/usersApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../../Redux/Feature/Modal/modalSlice";
import DeleteModal from "../../../../../Component/Modal/DeleteModal";
import EditModal from "../../../../../Component/Modal/EditModal";
import EditUser from "./EditUser";
import AddModal from "../../../../../Component/Modal/AddModal";
import AddUser from "./AddUser";
import Table from "../../../../../Component/Table/Table";
import { TError, TMeta } from "../../../../../types/globalTypes";
import SearchBar from "../../../../../Component/SearchBar/SearchBar";
import TableTabs from "../../../../../Component/Dashborad/TableTabs";
import ButtonWithModal from "../../../../../Component/Button/ButtonWithModal";
import DashboardTitle from "../../../../../Component/Dashborad/DashboardTitle";

const Users = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TUser | null>(null);
  const { data, isLoading, isFetching } = useGetAllUsersQuery([
    { name: "page", value: pageNumber },
  ]);
 console.log(data);

  const handleEditAndDelete = (data: TUser, name: "delete" | "edit") => {
    setSingleData(data);
    if (name === "delete") {
      dispatch(setIsDeleteModalOpen());
    } else if (name === "edit") {
      dispatch(setIsEditModalOpen());
    }
  };


  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
    { name: "Address", value: "address" },
    { name: "Action", value: "action" },
  ];
  const [
    deleteRole,
    { error, data: dCData, isSuccess, isLoading: dCIsloading, isError },
  ] = useDeleteUserMutation();
  const handleDelete = () => {
    deleteRole(singleData?.id);
  };
  return (
    <div className="">
      <DashboardTitle windowTitle="Users" text="Total Users">
        {data?.meta?.total || data?.data?.length || 0}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add User"></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TUser>
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        meta={data?.meta as TMeta}
        data={data?.data || []}
        onDeleteAndEdit={handleEditAndDelete}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      ></Table>
      {/* add role modal */}
      <AddModal width={500} isAddModalOpen={isAddModalOpen} title="Create User">
        {/* <AddRoles></AddRoles> */}
        <AddUser></AddUser>
      </AddModal>
      {/* edit category modal */}
      <EditModal
        width={500}
        isEditModalOpen={isEditModalOpen}
        title="Edit Users"
      >
        {/* <EditRoles<TRoles> itemData={singleData as TRoles}></EditRoles> */}
        <EditUser itemData={singleData as TUser}></EditUser>
      </EditModal>
      {/* delete category */}
      <DeleteModal
        data={dCData}
        error={error as TError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Category"
        onDelete={handleDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Under the User corresponding data will be removed "}
      ></DeleteModal>
    </div>
  );
};

export default Users;
