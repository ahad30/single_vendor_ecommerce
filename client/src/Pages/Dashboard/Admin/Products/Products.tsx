import { useState } from "react";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import { TProduct } from "../../../../types/product.types";
import { useGetProductsQuery } from "../../../../Redux/Feature/Admin/product/productApi";
import Table from "../../../../Component/Table/Table";
import { TMeta } from "../../../../types/globalTypes";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";

const Products = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TProduct | null>(null);
  const { data, isLoading, isFetching } = useGetProductsQuery([
    { name: "page", value: pageNumber },
  ]);
  const handleEditAndDelete = (data: TProduct, name: "delete" | "edit") => {
    setSingleData(data);
    if (name === "delete") {
      // console.log("delete", data);
      dispatch(setIsDeleteModalOpen());
    } else if (name === "edit") {
      // console.log("edit", data);
      dispatch(setIsEditModalOpen());
    }
  };

  // const [
  //   deleteCategory,
  //   { isLoading: dCIsloading, isError, isSuccess, data: dCData, error },
  // ] = useDeleteCategoryMutation();

  const columns = [
    { name: "Image", value: "thumbnail" },
    { name: "Name", value: "name" },
    { name: "UID", value: "product_uid" },
    { name: "Category", value: "category" },
    { name: "Brand", value: "brand" },
    { name: "List Type", value: "list_type" },
    { name: "Price", value: "price" },
    { name: "Quantity", value: "quantity" },
    { name: "Status", value: "is_published" },
    { name: "Created At", value: "created_at" },
    { name: "Product Type", value: "is_single_product" },
    // { name: "Variants", value: "variants.total_variants" },
    { name: "Action", value: "action" },
  ];
console.log(data)
  return (
    <div className="">
      <DashboardTitle windowTitle="Products" text=" Total Products">
        {data?.meta?.total || data?.data?.length || 0}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal
          defaultKey="product"
          title="Add Product"
        ></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TProduct>
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        meta={data?.meta as TMeta}
        data={data?.data || []}
        onDeleteAndEdit={handleEditAndDelete}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        defaultKey="products"
      ></Table>
      {/* add category modal */}
      {/* <AddModal isAddModalOpen={isAddModalOpen} title="Create Category">
    <AddCategory></AddCategory>
  </AddModal> */}
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

export default Products;
