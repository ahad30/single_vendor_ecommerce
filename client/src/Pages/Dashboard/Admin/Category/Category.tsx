import ButtonWithModal from "../../../../Component/Button/ButtonWithModal";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import Table from "../../../../Component/Table/Table";

const Category = () => {
  return (
    <div className="mt-12 px-5">
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-between my-5">
        <SearchBar></SearchBar>
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>
      <Table></Table>
    </div>
  );
};

export default Category;
