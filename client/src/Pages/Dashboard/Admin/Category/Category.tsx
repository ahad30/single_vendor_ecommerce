import { useState } from "react";
import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import AddModal from "../../../../Component/Modal/AddModal";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import Table from "../../../../Component/Table/Table";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../Redux/Feature/Admin/category/categoryApi";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import AddCategory from "./AddCategory";
import { TCategory } from "../../../../types";
import { TError, TMeta } from "../../../../types/globalTypes";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../Redux/Feature/Modal/modalSlice";
import EditModal from "../../../../Component/Modal/EditModal";
import EditCategory from "./EditCategory";
import DeleteModal from "../../../../Component/Modal/DeleteModal";
// import { PermissionContextProvider } from "../../../../contex/PermissionProvider";
const Category = () => {
  // const { loggedInUserPermissions, handleCheckPermissions } = useContext(
  //   PermissionContextProvider
  // );
  // // console.log(loggedInUserPermissions);
  // // console.log(handleCheckPermissions("view category"));
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);

  // console.log(location.search)
  // console.log({ from: "category componanet", pageNumber });
  const [singleData, setSingleData] = useState<TCategory | null>(null);
  const { data, isLoading, isFetching } = useGetCategoriesQuery([
    { name: "page", value: pageNumber },
  ]);
  


  //
  const handleEdit = (data: TCategory, name: "edit") => {
    if (name === "edit") {
      setSingleData(data);
      dispatch(setIsEditModalOpen());
    }
  };
  const handleDl = (data: TCategory, name: "delete") => {
    if (name === "delete") {
      setSingleData(data);
      dispatch(setIsDeleteModalOpen());
    }
  };

  const [
    deleteCategory,
    { isLoading: dCIsloading, isError, isSuccess, data: dCData, error },
  ] = useDeleteCategoryMutation();

  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Action", value: "action" },
  ];

  const handleDelete = () => {
    deleteCategory(singleData?.id);
  };

  return (
    <div className="">
      <DashboardTitle windowTitle="Categories" text=" Total Category">
        {data?.meta?.total}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TCategory>
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        meta={data?.meta as TMeta}
        data={data?.data || []}
        onDelete={handleDl}
        onEdit={handleEdit}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      ></Table>
      {/* add category modal */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Category">
        <AddCategory></AddCategory>
      </AddModal>
      {/* edit category modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        <EditCategory<TCategory>
          itemData={singleData as TCategory}
        ></EditCategory>
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

export default Category;
