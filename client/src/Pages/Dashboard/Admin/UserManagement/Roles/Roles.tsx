import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { RootState } from "../../../../../Redux/store";
import { TRoles } from "../../../../../types";
import {
  useDeleteRoleMutation,
  useGetAllRolesQuery,
} from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../../Redux/Feature/Modal/modalSlice";
import Table from "../../../../../Component/Table/Table";
import { TError, TMeta } from "../../../../../types/globalTypes";
import SearchBar from "../../../../../Component/SearchBar/SearchBar";
import DashboardTitle from "../../../../../Component/Dashborad/DashboardTitle";
import ButtonWithModal from "../../../../../Component/Button/ButtonWithModal";
import TableTabs from "../../../../../Component/Dashborad/TableTabs";
import AddModal from "../../../../../Component/Modal/AddModal";
import AddRoles from "./AddRoles";
import EditRoles from "./EditRoles";
import EditModal from "../../../../../Component/Modal/EditModal";
import DeleteModal from "../../../../../Component/Modal/DeleteModal";

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

  const handleEdit = (data: TRoles, name: "edit") => {
    if (name === "edit") {
      setSingleData(data);
      dispatch(setIsEditModalOpen());
    }
  };
  const handleDl = (data: TRoles, name: "delete") => {
    if (name === "delete") {
      setSingleData(data);
      dispatch(setIsDeleteModalOpen());
    }
  };



  const columns = [
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];
  const [
    deleteRole,
    { error, data: dCData, isSuccess, isLoading: dCIsloading, isError },
  ] = useDeleteRoleMutation();
  const handleDelete = () => {
    deleteRole(singleData?.id);
  };
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
        onEdit={handleEdit}
        onDelete={handleDl}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      ></Table>
      {/* add role modal */}
      <AddModal
        width={1000}
        isAddModalOpen={isAddModalOpen}
        title="Create role"
      >
        <AddRoles></AddRoles>
      </AddModal>
      {/* edit category modal */}
      <EditModal
        width={1000}
        isEditModalOpen={isEditModalOpen}
        title="Edit Roles "
      >
        <EditRoles<TRoles> itemData={singleData as TRoles}></EditRoles>
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
        description={"Under the Role corresponding data will be removed "}
      ></DeleteModal>
    </div>
  );
};

export default Roles;
