import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>{
    console.log(info?.source);
    console.log(value);
  }

  return (
    <div className="mb-2 lg:mb-0 lg:w-[30%] w-full">
      <Search
        style={{ width: "100%" }}
        placeholder="input search text"
        allowClear={true}
        enterButton="Search"
        size="large"
        loading={false}
        onSearch={onSearch}
      />
    </div>
  );
};

export default SearchBar;
