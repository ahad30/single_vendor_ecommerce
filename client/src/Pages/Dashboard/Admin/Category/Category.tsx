import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import DashboardTitle from "../../../../Component/Dashborad/DashboardTitle";
import TableTabs from "../../../../Component/Dashborad/TableTabs";
import AddModal from "../../../../Component/Modal/AddModal";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import Table from "../../../../Component/Table/Table";
import { useGetCategoriesQuery } from "../../../../Redux/Feature/Admin/category/categoryApi";
import { useAppSelector } from "../../../../Redux/hook";
import { RootState } from "../../../../Redux/store";
import AddCategory from "./AddCategory";

const Category = () => {
  const { isAddModalOpen, isEditModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  const { data } = useGetCategoriesQuery(undefined);
  console.log(data);
  return (
    <div className="mt-12 px-5">
      <DashboardTitle text=" Total Category">12</DashboardTitle>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <TableTabs></TableTabs>
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>
      <Table data={data}></Table>
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Category">
        <AddCategory></AddCategory>
      </AddModal>
    </div>
  );
};

export default Category;

type Tdata = { 
  nmae : string ;
  age: string
}
