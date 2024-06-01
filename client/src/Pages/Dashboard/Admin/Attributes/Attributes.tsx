import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import { TAttributes } from "../../../../types/attribute.types";
import {
  useDeleteAttributeMutation,
  useGetAttributesQuery,
} from "../../../../Redux/Feature/Admin/Attribute/attributeApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setIsViewModalOpen,
} from "../../../../Redux/Feature/Modal/modalSlice";
import DeleteModal from "../../../../Component/Modal/DeleteModal";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import { TError, TMeta } from "../../../../types/globalTypes";
import Table from "../../../../Component/Table/Table";
import AddModal from "../../../../Component/Modal/AddModal";
import EditModal from "../../../../Component/Modal/EditModal";
import ViewModal from "../../../../Component/Modal/ViewModal";
import ViewAllAttribute from "./ViewAllAttribute";

const Attributes = () => {
  const dispatch = useAppDispatch();
  const {
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isViewModalOpen,
  } = useAppSelector((state: RootState) => state.modal);
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TAttributes | null>(null);
  const { data, isLoading, isFetching } = useGetAttributesQuery([
    { name: "page", value: pageNumber },
  ]);
  const handleEditAndDelete = (data: TAttributes, name: "delete" | "edit") => {
    setSingleData(data);
    if (name === "delete") {
      console.log("delete", data);
      dispatch(setIsDeleteModalOpen());
    } else if (name === "edit") {
      console.log("edit", data);
      dispatch(setIsEditModalOpen());
    }
  };

  const [
    deleteAttribute,
    { isLoading: dCIsloading, isError, isSuccess, data: dCData, error },
  ] = useDeleteAttributeMutation();

  const columns = [
    { name: "Name", value: "name" },
    { name: "Attribute Value", value: "view" },
    { name: "Action", value: "action" },
  ];

  const handleDelete = () => {
    deleteAttribute(singleData?.id);
  };

  const handleViewModal = (data: TAttributes) => {
    setSingleData(data);
    dispatch(setIsViewModalOpen());
  };
  return (
    <div className="">
      <DashboardTitle windowTitle="Attributes" text=" Total Category">
        {data?.meta?.total}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Attribute"></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TAttributes>
        handleViewModal={handleViewModal}
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
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Attribute">
        {/* <AddCategory></AddCategory> */}
        <></>
      </AddModal>
      {/* edit category modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        {/* <EditCategory<TCategory>
            itemData={singleData as TCategory}
          ></EditCategory> */}
        <></>
      </EditModal>
      {/* view modal */}
      <ViewModal
        width={700}
        isViewModalOpen={isViewModalOpen}
        title="View All Attribute"
      >
        <ViewAllAttribute></ViewAllAttribute>
      </ViewModal>
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
        description={"Under the Attribute corresponding data will be removed "}
      ></DeleteModal>
    </div>
  );
};

export default Attributes;
