import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="lg:w-1/2 w-full mb-2 lg:mb-0">
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
