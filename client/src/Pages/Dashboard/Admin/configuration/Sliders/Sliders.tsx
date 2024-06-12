import { useState } from "react";
import {
  useDeleteSliderMutation,
  useGetSlidersQuery,
} from "../../../../../Redux/Feature/Admin/configuration/slidersApi";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "../../../../../Redux/Feature/Modal/modalSlice";
import { TSlider } from "../../../../../types/slider.types";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import { RootState } from "../../../../../Redux/store";
import DashboardTitle from "../../../../../Component/Dashborad/DashboardTitle";
import SearchBar from "../../../../../Component/SearchBar/SearchBar";
import TableTabs from "../../../../../Component/Dashborad/TableTabs";
import ButtonWithModal from "../../../../../Component/Button/ButtonWithModal";
import Table from "../../../../../Component/Table/Table";
import { TError, TMeta } from "../../../../../types/globalTypes";
import AddModal from "../../../../../Component/Modal/AddModal";
import EditModal from "../../../../../Component/Modal/EditModal";
import DeleteModal from "../../../../../Component/Modal/DeleteModal";
import EditSlider from "./EditSlider";
import AddSlider from "./AddSlider";

const Sliders = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [singleData, setSingleData] = useState<TSlider | null>(null);
  const { data, isLoading, isFetching } = useGetSlidersQuery([
    { name: "page", value: pageNumber },
  ]);
  const handleEditAndDelete = (data: TSlider, name: "delete" | "edit") => {
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
    deleteSlider,
    { isLoading: dCIsloading, isError, isSuccess, data: dCData, error },
  ] = useDeleteSliderMutation();

  const columns = [
    { name: "Image", value: "image" },
    { name: "Name", value: "name" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  const handleDelete = () => {
    deleteSlider(singleData?.id);
  };

  return (
    <div className="">
      <DashboardTitle windowTitle="Sliders" text=" Total Sliders">
        {data?.meta?.total}
      </DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Slider"></ButtonWithModal>
      </div>

      {/* table */}
      <Table<TSlider>
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
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Slider">
        <AddSlider></AddSlider>
      </AddModal>
      {/* edit category modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        {/* <EditCategory<TCategory>
          itemData={singleData as TCategory}
        ></EditCategory> */}
        <EditSlider<TSlider> itemData={singleData as TSlider}></EditSlider>
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
        description={"Slider will be deleted permanently"}
      ></DeleteModal>
    </div>
  );
};

export default Sliders;
