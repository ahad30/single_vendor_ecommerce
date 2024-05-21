import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Search
      style={{ width: "50%" }}
      placeholder="input search text"
      allowClear={true}
      enterButton="Search"
      size="large"
      loading={false}

      onSearch={onSearch}
    />
  );
};

export default SearchBar;
