import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <>
      <div className="border-gray-200 px-4 lg:px-6 py-1 bg-[#162447]">
        <div className="flex justify-between items-center lg:order-2 sticky top-0">
          <div>
            <p className="text-[#E0E0E0]">Dashboard</p>
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
