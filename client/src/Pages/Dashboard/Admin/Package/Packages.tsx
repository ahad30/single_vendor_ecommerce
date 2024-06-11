import { useState } from "react";
import { useGetPackageQuery } from "../../../../Redux/Feature/Admin/package/packageApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../Redux/Feature/Modal/modalSlice";
import { TPackage } from "../../../../types/package.types";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import EditModal from "../../../../Component/Modal/EditModal";
import AddModal from "../../../../Component/Modal/AddModal";
import Table from "../../../../Component/Table/Table";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import { TMeta } from "../../../../types/globalTypes";
import CreatePackage from "./CreatePackage";

const Packages = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TPackage | null>(null);
  const { data, isLoading, isFetching } = useGetPackageQuery([
    { name: "package_type", value: "new" },
    { name: "page", value: pageNumber },
  ]);
  const handleEditAndDelete = (data: TPackage, name: "delete" | "edit") => {
    setSingleData(data);
    if (name === "delete") {
      // console.log("delete", data);
      dispatch(setIsDeleteModalOpen());
    } else if (name === "edit") {
      // console.log("edit", data);
      dispatch(setIsEditModalOpen());
    }
  };
  // console.log(data);
  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Price", value: "price" },
    { name: "Quantity", value: "quantity" },
    { name: "Total items", value: "total_items" },
    { name: "Total orders", value: "total_orders" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  return (
    <div className="">
      <DashboardTitle windowTitle="Packages" text=" Total Packages">
        {data?.meta?.total || data?.data?.length || 0}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Package"></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TPackage>
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
        title="Create new Package"
      >
        <CreatePackage></CreatePackage>
      </AddModal>
      {/* edit category modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        {/* <EditCategory<TCategory>
      itemData={singleData as TCategory}
    ></EditCategory> */}
        <></>
      </EditModal>
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

export default Packages;
