import { IoSearch } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { setIsHomeCategorySidebarOpen } from "../../Redux/Feature/Modal/modalSlice";

const TopHeader = () => {
  const dispatch = useAppDispatch();
  const { isHomeCategorySidebarOpen } = useAppSelector(
    (state: RootState) => state.modal
  );

  // onclick = {()=> dispatch(setIsHomeCategorySidebarOpen()}
  return (
    <section className="mt-[-40px]">
      <div className="flex sticky top-0 justify-between items-center">
        {/* heading */}
        <div className="">
          <h2 className="font-bold text-lg md:text-3xl">
            <span className="text-[#45F806]">LO</span>GO
          </h2>
        </div>

        {/* searchBar */}
        <div className="relative w-[40%] md:w-[35%]  my-12 flex">
          <div className="w-full">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <form className="" action="">
              <input
                type="text"
                id="Search"
                name="search"
                placeholder="Search Products..."
                className="w-full px-2 md:px-4 outline-none py-[2px] md:py-2 border-gray-300 rounded-sm border-[0.5px] pe-10 shadow-sm sm:text-sm"
              />
            </form>

            <div className="absolute -end-2 bg-secondary px-2 md:px-4 -top-0 bottom-0 flex justify-center items-center rounded-sm md:h-[37px]">
              <IoSearch
                className="cursor-pointer  text-white"
                size={20}
              ></IoSearch>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">

        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
      
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/login" className="flex text-sm items-center text-[#808080]">
          login
        </NavLink>/
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/register" className=" text-sm text-[#808080]">
          Register
        </NavLink>

        </div> */}
        {/* card icon */}
        <div className="flex gap-x-3 justify-center items-center">
          {/* love */}
          <div className="border-[#092635] relative p-1 border-[1px] rounded-full bg-[#0926351f]">
            <div className="absolute text-[10px] md:text-[12px] px-[5px] top-[-6px] left-[17px] md:left-6 bg-red-400 text-white flex justify-center items-center rounded-full">
              <span>0</span>
            </div>
            <FaRegHeart className="md:w-6 md:h-6 text-[#092635]" />
          </div>
          {/* cart */}
          <div className="border-[#092635] relative p-1 border-[1px] rounded-full bg-[#0926351f]">
            <div className="absolute text-[10px] md:text-[12px] px-[5px] top-[-6px] left-[17px] md:left-6 bg-red-400 text-white flex justify-center items-center rounded-full">
              <span>0</span>
            </div>
            <IoMdCart className="md:w-6 md:h-6 text-[#092635]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;
