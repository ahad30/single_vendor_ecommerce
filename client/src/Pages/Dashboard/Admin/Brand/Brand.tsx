import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { TBrand } from "../../../../types";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../../../Redux/Feature/Admin/Brand/BrandApi";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import Table from "../../../../Component/Table/Table";
import AddModal from "../../../../Component/Modal/AddModal";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import EditModal from "../../../../Component/Modal/EditModal";
import DeleteModal from "../../../../Component/Modal/DeleteModal";
import { RootState } from "../../../../Redux/store";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../Redux/Feature/Modal/modalSlice";
import { TError, TMeta } from "../../../../types/globalTypes";
const Brand = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TBrand | null>(null);
  const { data, isLoading, isFetching } = useGetBrandsQuery([
    { name: "page", value: pageNumber },
  ]);
  console.log(data?.data);
  const handleEditAndDelete = (data: TBrand, name: "delete" | "edit") => {
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
    deleteCategory,
    { isLoading: dCIsloading, isError, isSuccess, data: dCData, error },
  ] = useDeleteBrandMutation();

  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];

  const handleDelete = () => {
    deleteCategory(singleData?.id);
  };

  return (
    <div>
      <DashboardTitle windowTitle="Categories" text=" Total brand">
        {data?.meta?.total}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Brand"></ButtonWithModal>
      </div>
      {/* table */}

      <Table<TBrand>
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        meta={data?.meta as TMeta}
        data={data?.data || []}
        onDeleteAndEdit={handleEditAndDelete}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      ></Table>
      {/* add brand modal */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Brand">
        <AddBrand></AddBrand>
      </AddModal>

      {/* edit brand modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Brand">
        <EditBrand<TBrand> itemData={singleData as TBrand}></EditBrand>
      </EditModal>
      {/* delete brand */}
      <DeleteModal
        data={dCData}
        error={error as TError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete brand"
        onDelete={handleDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Under the brand corresponding data will be removed "}
      ></DeleteModal>
    </div>
  );
};

export default Brand;
