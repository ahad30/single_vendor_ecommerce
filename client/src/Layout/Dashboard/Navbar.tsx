import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <>
      <div className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center lg:order-2 sticky top-0">
          <div>
            <p>Dashboard</p>
          </div>
          {/* profile */}
          <div>
            <Dropdown></Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
