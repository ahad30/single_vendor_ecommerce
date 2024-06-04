import { useState } from "react";
import {
  useDeleteCustomerMutation,
  useGetCustomerQuery,
} from "../../../../../Redux/Feature/Admin/Ecommerce/customer/customerApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../../Redux/Feature/Modal/modalSlice";
import { TCustomer } from "../../../../../types/customer.types";
import { RootState } from "../../../../../Redux/store";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import DeleteModal from "../../../../../Component/Modal/DeleteModal";
import { TError, TMeta } from "../../../../../types/globalTypes";
import EditModal from "../../../../../Component/Modal/EditModal";
import AddModal from "../../../../../Component/Modal/AddModal";
import Table from "../../../../../Component/Table/Table";
import TableTabs from "../../../../../Component/Dashborad/TableTabs";
import SearchBar from "../../../../../Component/SearchBar/SearchBar";
import DashboardTitle from "../../../../../Component/Dashborad/DashboardTitle";

const Customers = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TCustomer | null>(null);
  const { data, isLoading, isFetching } = useGetCustomerQuery([
    { name: "page", value: pageNumber },
  ]);
  const handleEditAndDelete = (data: TCustomer, name: "delete" | "edit") => {
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
    deleteCustomer,
    { isLoading: dCIsloading, isError, isSuccess, data: dCData, error },
  ] = useDeleteCustomerMutation();

  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];

  const handleDelete = () => {
    deleteCustomer(singleData?.id);
  };
  return (
    <div className="">
      <DashboardTitle windowTitle="Customer" text=" Total Customer">
        {data?.meta?.total || data?.data?.length || 0}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        {/* <ButtonWithModal title="Add Category"></ButtonWithModal> */}
      </div>

      {/* table */}
      <Table<TCustomer>
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
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Category">
        {/* <AddCategory></AddCategory> */}
        <></>
      </AddModal>
      {/* edit category modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        {/* <EditCategory<TCustoerm>
      itemData={singleData as TCategory}
    ></EditCategory> */}
        <></>
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
        description={"Under the category corresponding data will be removed "}
      ></DeleteModal>
    </div>
  );
};

export default Customers;
